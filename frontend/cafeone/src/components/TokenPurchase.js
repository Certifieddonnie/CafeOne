import React, { useState } from 'react';
import { ethers } from 'ethers';
import CoffeeContract from './ContractABI.json'; // Contract ABI
import { useWallet } from './WalletContext'; // Import the wallet context
import './TokenPurchase.css'; // Import the CSS for styling

const TokenPurchase = () => {
    // eslint-disable-next-line
    const { userAddress } = useWallet(); // Get the user's wallet address
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePurchaseTokens = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, CoffeeContract, signer);

                // Convert amount to Uint256
                const tokensToPurchase = ethers.BigNumber.from(amount);

                // Call the purchase_tokens function from the contract
                const tx = await contract.purchaseTokens(tokensToPurchase, {
                    gasLimit: ethers.utils.hexlify(1000000), // Set a high gas limit
                });

                await tx.wait(); // Wait for the transaction to be mined
                console.log('Tokens purchased successfully:', tx);
                alert('Tokens purchased successfully!');

                // Reset amount after successful purchase
                setAmount('');
            } else {
                alert('Please install MetaMask to use this DApp!');
            }
        } catch (error) {
            console.error('Error purchasing tokens:', error);
            alert('Failed to purchase tokens. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="token-purchase">
            <h2>Purchase Tokens</h2>
            <form onSubmit={handlePurchaseTokens}>
                <div>
                    <label>Amount of Tokens:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        step="1"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Purchasing...' : 'Purchase Tokens'}
                </button>
            </form>
        </div>
    );
};

export default TokenPurchase;
