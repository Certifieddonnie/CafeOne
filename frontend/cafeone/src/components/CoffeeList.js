import React, { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import CoffeeContract from './ContractABI.json'; // Contract ABI
import { useWallet } from './WalletContext'; // Import the wallet context
import { useNavigate } from 'react-router-dom';
import './CoffeeList.css';

const CoffeeList = () => {
  const { userAddress } = useWallet();
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors
  const [balance, setBalance] = useState(0); // To store token balance
  const navigate = useNavigate();


  const fetchCoffees = useCallback(async () => {
    try {
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      if (!contractAddress) {
        throw new Error("Contract address is missing!");
      }
      console.log("Inside FetchCoffees!")
      if (window.ethereum) {
        console.log("Inside Window ETH")
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, CoffeeContract, provider);
        console.log("Passed Contract caller!: ", await contract.owner())
  
        // Fetch the number of available coffees
        const coffeeCount = await contract.getCoffeeCount();
        console.log("Coffee Count: ", await contract.getCoffeeCount())
         // Call the new get_coffee_count method
        const coffeeList = [];
  
        // Loop through all available coffee IDs and fetch details using get_coffee
        for (let i = 0; i < coffeeCount; i++) {
          const coffee = await contract.getCoffee(i); // Fetch coffee by ID
          coffeeList.push({
            id: i,
            name: coffee[0], // Assuming the first element is the name
            price: coffee[1], // Assuming the second element is the price
          });
        }

        console.log("Coffees: ", coffeeList)
  
        setCoffees(coffeeList);
        setLoading(false);
      } else {
        alert("Please install MetaMask to use this DApp!");
      }
    } catch (error) {
      console.error("Error fetching coffees:", error);
      setError("Could not load coffees. Please try again later.");
    }
  }, []);
  

  const fetchTokenBalance = useCallback(async () => {
    try {
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, CoffeeContract, provider);
      const tokenBalance = await contract.getTokenBalanceFor(userAddress);

      setBalance(ethers.utils.formatEther(tokenBalance)); // Format as Ether (or tokens)
    } catch (error) {
      console.error("Error fetching token balance:", error);
      setError("Could not fetch token balance. Please try again.");
    }
  }, [userAddress]);

  useEffect(() => {
    if (!userAddress) {
      navigate('/'); // Redirect to Home if no wallet is connected
    } else {
      console.log("I got Here")
      fetchCoffees();
      console.log("I got Here")
      fetchTokenBalance(); // Fetch user's token balance
    }
  }, [userAddress, navigate, fetchCoffees, fetchTokenBalance]);


  const buyCoffee = async (coffeeId, price) => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this DApp!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(); // The user who is buying
      const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, CoffeeContract, signer);

      // Call the buyCoffee function from the smart contract
      const transaction = await contract.buyCoffee(coffeeId, {
        value: price,
      });

      await transaction.wait(); // Wait for the transaction to be mined
      alert("Coffee purchased successfully!");
    } catch (error) {
      console.error("Error purchasing coffee:", error);
      setError("Purchase failed. Please try again.");
    }
  };

  if (loading) {
    return <p className='cofli'>Loading coffees...</p>;
  }

  if (error) {
    return <p className='error-message'>{error}</p>;
  }

  return (
    <div className="coffee-list">
      <h2 className='cofli'>Available Coffees</h2>
      <p className='cofli'><strong>Your Token Balance:</strong> {balance} tokens</p> {/* Display the token balance here */}
      {coffees.length === 0 ? (
        <p className='cofli'>No coffees available</p>
      ) : (
        <ul className='cofli'>
          {coffees.map((coffee, index) => (
            <li key={index} className='cofli'>
              <h3 className='cofli'>Name: {coffee.name}</h3>
              <p className='cofli'>Price: {ethers.utils.formatEther(coffee.price)} ETH</p>
              <button className='cofli' onClick={() => buyCoffee(coffee.id, coffee.price)}>Buy Coffee</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoffeeList;
