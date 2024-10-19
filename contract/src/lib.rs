#![cfg_attr(not(feature = "export-abi"), no_main)]

#[global_allocator]
static ALLOC: mini_alloc::MiniAlloc = mini_alloc::MiniAlloc::INIT;

extern crate alloc;

use stylus_sdk::{alloy_primitives::U256, prelude::*};
use alloy_primitives::{Address, Uint};
use stylus_sdk::{block, console};
use stylus_sdk::storage::StorageString;
use stylus_sdk::msg;

sol_storage! {
    #[entrypoint]
    pub struct CoffeeShop {
        address owner;
        bool active;
        mapping(uint256 => uint256) coffee_prices;
        mapping(uint256 => StorageString) coffee_names;
        mapping(address => uint256) token_balances;
        mapping(address => uint256) purchase_counts;
        mapping(address => uint256) last_purchase_times;
        mapping(uint256 => uint256) coffee_sales;
        uint256 coffee_count;
    }
}

#[external]
impl CoffeeShop {
    pub fn init(&mut self) {
        let owner_address = Address::parse_checksummed("0x49A070FF5a7A33a990A9C799A76Dc03cAF526376", None).expect("Invalid address");
        self.owner.set(owner_address);
        self.active.set(true);
        console!("CoffeeShop initialized with owner: {:?}", owner_address);
    }

    pub fn owner(&self) -> Address {
        self.owner.get()
    }

    pub fn is_active(&self) -> bool {
        self.active.get()
    }

    pub fn add_coffee(&mut self, name: String, price: U256) {
        let coffee_id = self.coffee_count.get() + U256::from(1);
        
        let mut name_accessor = self.coffee_names.setter(coffee_id);
        name_accessor.set_str(&name);

        let mut price_accessor = self.coffee_prices.setter(coffee_id);
        price_accessor.set(price);

        self.coffee_count.set(coffee_id);

        console!("CoffeeAdded: id={:?}, name={}, price={:?}", coffee_id, name, price);
    }

    pub fn get_coffee(&self, id: U256) -> (String, U256) {
        let name = self.coffee_names.get(id).get_string();
        let price = self.coffee_prices.get(id);
        (name, price)
    }

    pub fn purchase_tokens(&mut self, amount: Uint<256, 4>) {
        let user_address = msg::sender();
        let mut token_balance_accessor = self.token_balances.setter(user_address);
        let current_balance = token_balance_accessor.get();
        token_balance_accessor.set(current_balance + amount);

        console!("TokensPurchased: user={:?}, amount={:?}", user_address, amount);
    }

    pub fn buy_coffee(&mut self, coffee_id: U256) -> bool {
        let user_address = msg::sender();
        let token_balance = self.token_balances.get(user_address);
        let coffee_price = self.coffee_prices.get(coffee_id);

        if token_balance >= coffee_price {
            let last_purchase = self.last_purchase_times.get(user_address);
            let thirty_seconds_from_last_purchase = last_purchase + U256::from(30);
            let current_time = block::timestamp();

            if thirty_seconds_from_last_purchase <= Uint::<256, 4>::from(current_time) {
                // Increment purchase count
                let mut purchase_count_accessor = self.purchase_counts.setter(user_address);
                let new_purchase_count = purchase_count_accessor.get() + U256::from(1);
                purchase_count_accessor.set(new_purchase_count);

                // Update last purchase time
                let mut time_accessor = self.last_purchase_times.setter(user_address);
                time_accessor.set(U256::from(current_time));

                // Deduct tokens
                let mut token_balance_accessor = self.token_balances.setter(user_address);
                token_balance_accessor.set(token_balance - coffee_price);

                // Increment coffee sales
                let mut sales_accessor = self.coffee_sales.setter(coffee_id);
                let new_sales = sales_accessor.get() + U256::from(1);
                sales_accessor.set(new_sales);

                console!("CoffeePurchased: id={:?}, buyer={:?}, paid={:?}", coffee_id, user_address, coffee_price);
                return true;
            } else {
                console!("HTTP 429: Too Many Purchases (you must wait at least 30 seconds between purchases)");
                return false;
            }
        } else {
            console!("HTTP 402: Payment Required (you need more tokens to buy this coffee)");
            return false;
        }
    }

    #[view]
    pub fn get_purchase_count_for(&self, user_address: Address) -> Uint<256, 4> {
        self.purchase_counts.get(user_address)
    }

    #[view]
    pub fn get_token_balance_for(&self, user_address: Address) -> Uint<256, 4> {
        self.token_balances.get(user_address)
    }

    #[view]
    pub fn get_coffee_sales(&self, coffee_id: U256) -> Uint<256, 4> {
        self.coffee_sales.get(coffee_id)
    }
    #[view]
    pub fn get_coffee_count(&self) -> Uint<256, 4> {
        *self.coffee_count
    }
}
