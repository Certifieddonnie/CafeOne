import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CoffeeList from "./components/CoffeeList";
import { WalletProvider } from "./components/WalletContext";
import AddCoffee from "./components/AddCoffeeForm";
import TokenPurchase from "./components/TokenPurchase";
import CoffeeSalesHistory from "./components/CoffeeSalesHistory";
import PurchaseHistory from "./components/PurchaseHistory";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar"; // Import the Navbar
import "./App.css";

const App = () => {
  return (
    <WalletProvider>
      <Router>
        <div className="app">
          <Navbar /> {/* Include Navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coffees" element={<CoffeeList />} />
            <Route path="/buytoken" element={<TokenPurchase />} />
            <Route path="/my-purchase-history" element={<PurchaseHistory />} />
            <Route path="/add-coffee" element={<AddCoffee />} />
            <Route path="/coffee-sales" element={<CoffeeSalesHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
};

export default App;
