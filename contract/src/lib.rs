// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::evm;
use stylus_sdk::msg;
use stylus_sdk::{alloy_primitives::U256, prelude::*};
use alloy_primitives::Address;
use stylus_sdk::console;
use stylus_sdk::stylus_proc::entrypoint;
use std::pin::Pin;
use alloy_sol_types::sol;


// Define some persistent storage using the Solidity ABI.
// `Counter` will be the entrypoint.

sol! {
    event CoffeeAdded(uint256 indexed id, string name, uint256 price);
    event CoffeePurchased(uint256 indexed id, address indexed buyer, uint256 paid);
}

pub struct Coffee {
    #[allow(dead_code)]
    id: u64,
    name: String,
    price: U256,
}

impl Erase for Coffee {
    fn erase(&mut self) {
        todo!()
    }
}

impl<'a> From<Coffee> for &'a Coffee {
    fn from(coffee: Coffee) -> Self {
        // Convert Order to &'a Order
        Box::leak(Box::new(coffee))
    }
}

impl<'a> SimpleStorageType<'a> for Coffee {
    fn set_by_wrapped(&mut self, value: Self::Wraps<'a>) {
        let _ = value;
        todo!()
    }
    // Implement the required methods here
}

impl StorageType for Coffee {
    fn load<'a>(self) -> Self::Wraps<'a> {
        // Implement the load method
        todo!()
    }
    
    type Wraps<'a> = &'a Coffee
    where
        Self: 'a;
    
    type WrapsMut<'a> = &'a mut Coffee
    where
        Self: 'a;
    
    unsafe fn new (_slot: U256, _offset: u8) -> Self {
        todo!()
    }

    fn load_mut<'s>(self) -> Self::WrapsMut<'s>
        where
            Self: 's {
        todo!()
    }

    const SLOT_BYTES: usize = 32;

    const REQUIRED_SLOTS: usize = 0;
}

const OWNER: &str = "0x49A070FF5a7A33a990A9C799A76Dc03cAF526376";


sol_storage! {
    #[entrypoint]
    pub struct CoffeeShop {
        address owner;
        bool active;
        Coffee[] coffees;
    }
}

#[external]
impl CoffeeShop {
    pub fn init(&mut self) {
        let owner_address = Address::parse_checksummed(OWNER, None).expect("Invalid address");

        self.owner.set(owner_address);
        self.active.set(true);
    }

    pub fn owner(&self) -> Address {
        self.owner.get()
    }

    pub fn is_active(&self) -> bool {
        self.active.get()
    }

    pub fn add_coffee(&mut self, cof_id: u64, name: String, price: U256) {
        if msg::sender() != self.owner() {
            panic!("Only the owner can add a coffee");
        }

        let mut new_coffee = Coffee {
            id: cof_id,
            name: name.clone(),
            price: price,
        };
        let mut pinned_name = Pin::new(&mut new_coffee.name);
        let mut pinned_price = Pin::new(&mut new_coffee.price);

        pinned_name.as_mut().push_str(name.as_str());
        *pinned_price.as_mut() = price;

        evm::log(CoffeeAdded {
            id: U256::from(cof_id),
            name,
            price,
        });
    }

    pub fn get_coffee(&self, id: U256) -> (String, U256) {
        let coffee = self.coffees.get(id).unwrap();
        (coffee.name.clone(), coffee.price)
    }

    #[payable]
    pub fn buy_coffee(&mut self, id: u64) {
        let coffee = self.coffees.get(*&id).expect("Coffee not found");
        let price = coffee.price;

        if msg::value() < price {
            panic!("Insufficient payment");
        }

        let buyer = msg::sender();
        let paid = msg::value();

        evm::log(CoffeePurchased {
            id: U256::from(id),
            buyer,
            paid,
        });
    }
}