---

# CafeOne DApp

## Overview

The **CafeOne DApp** is a decentralized application that allows users to add and buy coffee using the Arbitrum Layer 2 network. It interacts with a smart contract deployed on Arbitrum, handling coffee transactions such as adding new coffee entries and purchasing coffee with Ethereum (ETH).

This DApp is built using React for the frontend, with **web3.js** for blockchain interactions and for wallet connection.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Smart Contract Overview](#smart-contract-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)

## Features

- **Wallet Connection**: Users can connect their Ethereum wallet using Web3Modal.
- **Add Coffee**: Owners can add new coffee products to the shop.
- **Buy Coffee**: Users can purchase coffee by sending ETH.
- **Contract Info**: Displays the contract owner and the active status of the coffee shop.

## Technologies Used

### Frontend:
- **React**: For building the user interface.
- **web3.js**: To interact with the Ethereum blockchain.
- **React-Bootstrap**: For UI components and styling.

### Blockchain:
- **Arbitrum Network**: Layer 2 Ethereum scaling solution.
- **Rust**: Smart contract language for Ethereum.

## Smart Contract Overview

The smart contract contains the following functions:
1. **addCoffee(uint64 cof_id, string name, uint256 price)**: Allows the owner to add a new coffee.
2. **buyCoffee(uint64 id)**: Allows users to purchase a coffee by its ID.
3. **getCoffee(uint256 id)**: Fetches coffee details (name and price) based on its ID.
4. **init()**: Initializes the contract.
5. **isActive()**: Returns the active status of the contract.
6. **owner()**: Returns the contract owner’s address.

The contract runs on the Arbitrum network, ensuring low transaction fees and high throughput.

## Project Structure

```bash
src/
│
├── components/
│   ├── AddCoffeeForm.js    # Component for adding new coffee
│   ├── BuyCoffeeForm.js    # Component for buying coffee
│   ├── ContractInfo.js     # Displays contract owner and status
│   ├── WalletConnect.js    # Handles wallet connection logic
│   └── CoffeeShop.js       # Main container component
│
├── App.js                 # Root component
└── index.js               # Entry point for the app
```

## Getting Started

To run the CafeOne DApp locally, follow these steps:

### Prerequisites

Make sure you have the following installed:
- **Node.js**: v12 or later
- **npm**: Comes with Node.js
- **Metamask**: Chrome/Firefox extension for interacting with Ethereum

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Certifieddonnie/CafeOne.git
   cd CafeOne
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Configure your Arbitrum network settings in `web3.js` by providing the correct RPC URL for the network.

4. Update the smart contract address and ABI in `CoffeeShop.js`:

   ```javascript
   const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with deployed contract address
   const coffeeShopAbi = [ /* ABI array here */ ];
   ```

### Usage

1. **Start the development server**:

   ```bash
   npm start
   ```

2. Open the app in your browser by navigating to:

   ```
   http://localhost:3000
   ```

3. Connect your wallet using the **Connect Wallet** button.
4. Add coffee by entering its ID, name, and price. The form is only visible to the contract owner.
5. Buy coffee by entering its ID. Users will need to send the appropriate amount of ETH to purchase.

## Components

### 1. **`CoffeeShop.js`**
   The main component that contains the core logic for connecting to the blockchain and passing data to child components.

### 2. **`WalletConnect.js`**
   Handles wallet connection through Web3Modal, allowing users to connect their Ethereum wallet.

### 3. **`AddCoffeeForm.js`**
   Allows the contract owner to add new coffee entries by specifying ID, name, and price.

### 4. **`BuyCoffeeForm.js`**
   Allows users to purchase coffee by entering the coffee ID.

### 5. **`ContractInfo.js`**
   Displays the contract owner’s address and whether the coffee shop is active or not.

## Contributing

Contributions are welcome! If you have any ideas or improvements, feel free to open an issue or submit a pull request.

To contribute:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Create a Pull Request.

---
