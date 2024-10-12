// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CoffeeList from "./components/CoffeeList"; // Import CoffeeList
import { WalletProvider } from "./components/WalletContext";
import AddCoffee from "./components/AddCoffeeForm"; // Import AddCoffee
import "./App.css";

const App = () => {
  return (
    <WalletProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coffees" element={<CoffeeList />} />
            <Route path="/add-coffee" element={<AddCoffee />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
};

export default App;

