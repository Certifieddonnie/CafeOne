// src/contract.js
import web3 from './web3';
// Replace with your contract's ABI
import ContractABI from './ContractABI.json';

const contractAddress = '0xd3afc194debb95d997503b20aba624dfe0826eca'; // Replace with your contract's address
const contract = new web3.eth.Contract(ContractABI, contractAddress);

export default contract;


