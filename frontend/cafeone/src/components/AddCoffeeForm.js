import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CoffeeContract from './ContractABI.json'; // Contract ABI
import { useWallet } from './WalletContext'; // Import the wallet context
import './AddCoffee.css'; // Import the CSS

const AddCoffee = () => {
    const { userAddress } = useWallet();
    const [coffeeName, setCoffeeName] = useState('');
    const [coffeePrice, setCoffeePrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [ownerAddress, setOwnerAddress] = useState('');

    useEffect(() => {
        const fetchOwnerAddress = async () => {
            try {
              // const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
              const owner = process.env.REACT_APP_OWNER_ADDRESS;
        
              console.log("Owner: ", process.env.REACT_APP_OWNER_ADDRESS)
              setOwnerAddress(owner);
            } catch (error) {
              console.error("Error fetching owner address:", error);
            }
        };
          fetchOwnerAddress();
    }, []);

    const handleAddCoffee = async (e) => {
        e.preventDefault();
        if (userAddress !== ownerAddress) {
            alert("You do not have permission to add coffee.");
            return;
        }
        
        setLoading(true);
        try {
            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, CoffeeContract, signer);
                
                const priceInWei = ethers.utils.parseEther(coffeePrice);

                console.log("Coffee name being sent:", coffeeName);
                console.log("Coffee name in UTF-8:", unescape(encodeURIComponent(coffeeName)));
                
                const tx = await contract.addCoffee( 
                    coffeeName, 
                    priceInWei,
                    {
                        gasLimit: ethers.utils.hexlify(1000000)
                    }
                );
                await tx.wait();
                alert('Coffee added successfully!');
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
