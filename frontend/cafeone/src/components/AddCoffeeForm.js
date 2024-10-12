import React, { useState } from 'react';
import { ethers } from 'ethers';
import CoffeeContract from './ContractABI.json'; // Contract ABI
import { useWallet } from './WalletContext'; // Import the wallet context
import './AddCoffee.css'; // Import the CSS

const AddCoffee = () => {
  // eslint-disable-next-line
    const { userAddress } = useWallet();
    const [coffeeId, setCoffeeId] = useState('');
    const [coffeeName, setCoffeeName] = useState('');
    const [coffeePrice, setCoffeePrice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddCoffee = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
          // console.log("Process Env:", process.env.REACT_APP_CONTRACT_ADDRESS);
          console.log("Contract Address:", process.env.REACT_APP_CONTRACT_ADDRESS);
          console.log("Contract ABI:", CoffeeContract);
          
          if (window.ethereum) {
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              console.log("User Address:", await signer.getAddress());
              const contract = new ethers.Contract(contractAddress, CoffeeContract, signer);
              
              const priceInWei = ethers.utils.parseEther(coffeePrice);
              
              // Assuming the smart contract function is `addCoffee(id, name, price)`
              const tx = await contract.addCoffee(
                parseInt(coffeeId), 
                coffeeName, 
                priceInWei,
                {
                    gasLimit: ethers.utils.hexlify(1000000) // Set a high gas limit (1 million units)
                }
            );
              await tx.wait();
              
              console.log('Coffee added successfully:', tx);
              alert('Coffee added successfully!');
              // Reset the form
              setCoffeeId('');
              setCoffeeName('');
              setCoffeePrice('');
            } else {
                alert('Please install MetaMask to use this DApp!');
            }
        } catch (error) {
            console.error('Error adding coffee:', error);
            alert('Failed to add coffee. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cofad">
            <h2>Add New Coffee</h2>
            <form onSubmit={handleAddCoffee}>
                <div>
                    <label>Coffee ID:</label>
                    <input 
                        type="text" 
                        value={coffeeId} 
                        onChange={(e) => setCoffeeId(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Coffee Name:</label>
                    <input 
                        type="text" 
                        value={coffeeName} 
                        onChange={(e) => setCoffeeName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Coffee Price (in ETH):</label>
                    <input 
                        type="number" 
                        value={coffeePrice} 
                        onChange={(e) => setCoffeePrice(e.target.value)} 
                        required 
                        step="0.01" 
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Coffee'}
                </button>
            </form>
        </div>
    );
};

export default AddCoffee;
