// contract.js
import web3 from './web3';

const address = 'YOUR_CONTRACT_ADDRESS';
const abi = [
  // Your contract ABI goes here
];

const contract = new web3.eth.Contract(abi, address);

export default contract;