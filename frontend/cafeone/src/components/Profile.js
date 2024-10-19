import React, { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import CoffeeContract from './ContractABI.json'; // Replace with your contract ABI
import { useWallet } from './WalletContext'; // Import the Wallet context
import { useNavigate } from "react-router-dom";
import './Profile.css'; // Optional, for styling

const Profile = () => {
  const { userAddress } = useWallet(); // Get the connected wallet address from context
  const [balance, setBalance] = useState('0'); // To store the token balance
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the user's token balance from the smart contract
  const fetchTokenBalance = useCallback(async () => {
    try {
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Your contract address
      if (!contractAddress) {
        throw new Error("Contract address is missing!");
      }

      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, CoffeeContract, provider);

        const tokenBalance = await contract.getTokenBalanceFor(userAddress);
        setBalance(ethers.utils.formatEther(tokenBalance)); // Format as Ether (or tokens)
      } else {
        alert("Please install MetaMask to use this DApp!");
      }
    } catch (error) {
      console.error("Error fetching token balance:", error);
      setError("Could not fetch token balance. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  // Fetch the token balance on component mount
  useEffect(() => {
    if (userAddress) {
      fetchTokenBalance();
    }
    else {
      navigate('/')
    }
  }, [userAddress, fetchTokenBalance, navigate]);


  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Address:</strong> {userAddress}</p>
        <p><strong>Token Balance:</strong> {balance} tokens</p>
      </div>
      {/* You can add more user info as needed */}
    </div>
  );
};

export default Profile;
