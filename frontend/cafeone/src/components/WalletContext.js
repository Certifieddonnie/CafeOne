import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

// Create a context for wallet connection
const WalletContext = createContext();

// Custom hook to use the WalletContext
export const useWallet = () => {
  return useContext(WalletContext);
};

// Wallet Provider component
export const WalletProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // Create ethers.js provider and connect wallet
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        setUserAddress(userAddress);
        console.log("Connected Account:", userAddress);
  
        // Check the current network ID
        const network = await provider.getNetwork();
        const networkId = network.chainId;
        console.log("Current network ID:", networkId);
  
        // Switch to Arbitrum Sepolia network if not connected
        if (networkId !== 421614) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x66eee", // Hexadecimal for 421614
                  chainName: "Arbitrum Sepolia",
                  nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: ["https://go.getblock.io/6e86f66dfd164cb5a3eaf7e67a8f75f2"],
                  blockExplorerUrls: ["https://sepolia.arbiscan.io"],
                },
              ],
            });
  
            // After adding the network, switch to it
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x66eee" }],
            });
  
            console.log("Switched to Arbitrum Sepolia network");
          } catch (error) {
            console.error("Error switching to Arbitrum Sepolia network:", error);
            alert("Network Switch Failed. Please try switching manually.");
          }
        }
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };


  return (
    <WalletContext.Provider value={{ userAddress, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
