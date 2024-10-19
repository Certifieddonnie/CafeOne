import React, { useState } from "react";
import { useWallet } from "./WalletContext"; // Import the WalletContext
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css"; // Import your updated CSS

const Home = () => {
  const { userAddress, connectWallet } = useWallet(); // Use the context to get the user's address and connectWallet function
  const navigate = useNavigate(); // Initialize useNavigate

  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for handling errors

  const handleConnectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      await connectWallet(); // Connect the wallet
      if (userAddress) {
        navigate("/add-coffee"); // Redirect to Coffee List page if connected
      }
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false); // Stop loading state
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

        <p>Our smart contract securely handles coffee-related transactions on-chain.</p>
        <p><strong>Connect your wallet to get started!</strong></p>

        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}

        <button onClick={handleConnectWallet} className="wallet-button" disabled={isLoading}>
          {isLoading
            ? "Connecting..."
            : userAddress
              ? `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`
              : "Connect Wallet"}
        </button>
      </header>
    </div>
  );
};

export default Home;
