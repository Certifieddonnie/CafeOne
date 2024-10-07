// web3.js
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
  console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
}

export default web3;