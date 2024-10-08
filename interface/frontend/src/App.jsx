import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./component/Product";
import Home from "./component/Home";
import AddProduct from "./component/AddProduct";
import Navbar from "./component/Navbar";

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <div className="bg-black mx-auto min-h-full">
          <div className="flex justify-center items-center h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/addProduct" element={<AddProduct/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
