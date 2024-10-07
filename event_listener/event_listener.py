import asyncio
from web3 import Web3
from web3.exceptions import TransactionNotFound
from dotenv import load_dotenv
import os
import json

load_dotenv()

# Connect to Ethereum node
w3 = Web3(Web3.LegacyWebSocketProvider(os.getenv('ETHEREUM_NODE_URL')))

# Check if connected to an Ethereum node
if not w3.is_connected():
    raise Exception("Not connected to Ethereum node")

# Contract details
contract_address = os.getenv('CONTRACT_ADDRESS')

# Convert to checksum address
checksum_address = Web3.to_checksum_address(contract_address)

# Load ABI from file
with open('coffee_shop_abi.json', 'r') as abi_file:
    contract_abi = json.load(abi_file)

contract = w3.eth.contract(address=checksum_address, abi=contract_abi)

def handle_event(event):
    event_name = event['event']
    if event_name == 'CoffeeAdded':
        print(f"New coffee added: ID={event['args']['id']}, Name={event['args']['name']}, Price={event['args']['price']}")
    elif event_name == 'CoffeePurchased':
        print(f"Coffee purchased: ID={event['args']['id']}, Buyer={event['args']['buyer']}, Paid={event['args']['paid']}")

async def log_loop(event_filter, poll_interval):
    while True:
        try:
            for event in event_filter.get_new_entries():
                handle_event(event)
        except TransactionNotFound:
            pass
        await asyncio.sleep(poll_interval)

async def main():
    coffee_added_filter = contract.events.CoffeeAdded.create_filter(fromBlock='latest')
    coffee_purchased_filter = contract.events.CoffeePurchased.create_filter(fromBlock='latest')
    
    await asyncio.gather(
        log_loop(coffee_added_filter, 2),
        log_loop(coffee_purchased_filter, 2)
    )

if __name__ == '__main__':
    asyncio.run(main())
