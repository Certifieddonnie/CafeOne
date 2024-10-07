import React, { useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import contract from "../Contract";

const Home = () => {
  const [account, setAccount] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  const navigateToAddProduct = () => {
    navigate("/addProduct", { state: { account } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Connect to MetaMask</h1>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={connectWallet}
        >
          Connect Your MetaMask Address
        </button>
        {account && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <p className="font-semibold">Connected Account:</p>
            <p>{account}</p>
            <button
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300 mt-4"
              onClick={navigateToAddProduct}
            >
              Go to Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;