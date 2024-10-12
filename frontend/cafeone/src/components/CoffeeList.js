import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CoffeeContract from './ContractABI.json'; // Contract ABI
import { useWallet } from './WalletContext'; // Import the wallet context
import { useNavigate } from 'react-router-dom';
import './CoffeeList.css';

const CoffeeList = () => {
  const { userAddress } = useWallet();
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAddress) {
      navigate('/'); // Redirect to Home if no wallet is connected
    } else {
      fetchCoffees();
    }
  }, [userAddress, navigate]);

  const fetchCoffees = async () => {
    try {
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, CoffeeContract.abi, provider);

        // Fetch the list of coffees from the smart contract
        const coffeeList = await contract.getCoffees();
        setCoffees(coffeeList);
        setLoading(false);
      } else {
        alert("Please install MetaMask to use this DApp!");
      }
    } catch (error) {
      console.error("Error fetching coffees:", error);
    }
  };

  if (loading) {
    return <p className='cofli'>Loading coffees...</p>;
  }

  return (
    <div className="coffee-list">
      <h2 className='cofli'>Available Coffees</h2>
      {coffees.length === 0 ? (
        <p className='cofli'>No coffees available</p>
      ) : (
        <ul className='cofli'>
          {coffees.map((coffee, index) => (
            <li key={index} className='cofli'>
              <h3 className='cofli'>{coffee.name}</h3>
              <p className='cofli'>Price: {ethers.utils.formatEther(coffee.price)} ETH</p>
              <button className='cofli'>Buy Coffee</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoffeeList;
