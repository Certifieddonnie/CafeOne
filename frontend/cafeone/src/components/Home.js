import React from "react";
import { useWallet } from "./WalletContext"; // Import the WalletContext
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css"; // Import your updated CSS

const Home = () => {
  const { userAddress, connectWallet } = useWallet(); // Use the context to get the user's address and connectWallet function
  const navigate = useNavigate(); // Initialize useNavigate

  const handleConnectWallet = async () => {
    await connectWallet(); // Connect the wallet
    if (userAddress) {
      navigate("/coffees"); // Redirect to Coffee List page if connected
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to CafeOne DApp</h1>
        <p>
          CafeOne is a decentralized application that brings your coffee experience into the world of blockchain. Using the Arbitrum Layer 2 network, CafeOne allows users to explore and purchase coffee in a trustless, transparent environment.
        </p>

        <h2>Overview</h2>
        <p>
          The <strong>CafeOne DApp</strong> is powered by the Arbitrum Layer 2 network, ensuring fast and low-cost transactions. It allows users to:
        </p>
        <ul>
          <li>Explore a wide range of coffees</li>
          <li>Add new coffee varieties to the menu</li>
          <li>Purchase coffee using Ethereum (ETH)</li>
        </ul>

        <p>
          Our smart contract securely handles coffee-related transactions on-chain. 
        </p>
        <p>
        <strong>Connect your wallet to get started!</strong>
        </p>

        <button onClick={handleConnectWallet} className="wallet-button">
          {userAddress ? `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : "Connect Wallet"}
        </button>
      </header>
    </div>
  );
};

export default Home;
