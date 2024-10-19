import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import CoffeeContract from './ContractABI.json'; // Contract ABI
import { useWallet } from './WalletContext'; // Import the wallet context
import './PurchaseHistory.css'; // Import CSS for styling

const PurchaseHistory = () => {
    const { userAddress } = useWallet(); // Get the user's wallet address
    const [purchaseCount, setPurchaseCount] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPurchaseHistory = useCallback(async () => {
        setLoading(true);
        try {
            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, CoffeeContract, signer);

                // Call the get_purchase_count_for function from the contract
                const count = await contract.getPurchaseCountFor(userAddress);
                setPurchaseCount(count.toString());
            } else {
                alert('Please install MetaMask to use this DApp!');
            }
        } catch (error) {
            console.error('Error fetching purchase history:', error);
            alert('Failed to fetch purchase history. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [userAddress]);

    const handleRefresh = () => {
        fetchPurchaseHistory(); // Call the fetch function on button click
    };

    useEffect(() => {
        if (userAddress) {
            fetchPurchaseHistory(); // Fetch purchase history when the component mounts
        }
    }, [userAddress, fetchPurchaseHistory]);

    return (
        <div className="purchase-history">
            <h2>Your Purchase History</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="purchase-count">
                    <h3>Total Purchases: {purchaseCount !== null ? purchaseCount : '0'}</h3>
                    <button className="refresh-button" onClick={handleRefresh}>
                        Refresh
                    </button>
                </div>
            )}
        </div>
    );
};

export default PurchaseHistory;
