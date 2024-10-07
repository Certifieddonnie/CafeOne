// src/web3.js
import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    window.ethereum.enable(); // Request account access if needed
  } catch (error) {
    console.error("User denied account access");
  }
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

// Connect to Arbitrum node
const arbitrumNodeUrl = 'https://arb-mainnet.g.alchemy.com/v2/QADjd7Me9ppeOUK7L_cWJsn7ncztjMQq'; // Replace with your Arbitrum node URL
web3.setProvider(new Web3.providers.HttpProvider(arbitrumNodeUrl));

export default web3;