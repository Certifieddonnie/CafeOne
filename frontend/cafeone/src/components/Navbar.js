import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from './WalletContext'; // Import wallet context
import './Navbar.css';

const Navbar = () => {
  const { userAddress, connectWallet } = useWallet();

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {userAddress && (
          <>
            <li><Link to="/coffees">Coffee List</Link></li>
            <li><Link to="/buytoken">Buy Tokens</Link></li>
            <li><Link to="/my-purchase-history">My Purchase History</Link></li>
            {/* <li><Link to="/add-coffee">Add Coffee</Link></li> */}
            {/* <li><Link to="/coffee-sales">Coffee Sales</Link></li> */}
            <li><Link to="/profile">Profile</Link></li>
          </>
        )}
      </ul>
      <div className="wallet-connect">
        {userAddress ? (
          <span>Connected: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}</span>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
