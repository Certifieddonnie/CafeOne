import React, { useState } from 'react';
import { ethers } from 'ethers';
import CoffeeContract from './ContractABI.json'; // Contract ABI
import { useWallet } from './WalletContext'; // Import the wallet context
import './CoffeeSalesHistory.css'; // Import CSS for styling

const CoffeeSalesHistory = () => {
    // eslint-disable-next-line
    const { userAddress } = useWallet(); // Get the user's wallet address
    const [coffeeId, setCoffeeId] = useState('');
    const [salesCount, setSalesCount] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSalesHistory = async () => {
        setLoading(true);
        try {
            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, CoffeeContract, signer);

                // Call the get_coffee_sales function from the contract
                const sales = await contract.getCoffeeSales(ethers.BigNumber.from(coffeeId));
                setSalesCount(sales.toString());
            } else {
                alert('Please install MetaMask to use this DApp!');
            }
        } catch (error) {
            console.error('Error fetching sales history:', error);
            alert('Failed to fetch sales history. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="coffee-sales-history">
            <h2>Coffee Sales History</h2>
            <div>
                <label>Coffee ID:</label>
                <input
                    type="text"
                    value={coffeeId}
                    onChange={(e) => setCoffeeId(e.target.value)}
                    required
                />
                <button onClick={fetchSalesHistory} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Sales History'}
                </button>
            </div>
            {salesCount !== null && (
                <div className="sales-result">
                    <h3>Sales Count: {salesCount}</h3>
                </div>
            )}
        </div>
    );
};

export default CoffeeSalesHistory;
