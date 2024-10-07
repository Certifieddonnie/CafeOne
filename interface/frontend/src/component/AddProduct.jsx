import React, { useState } from "react";
import web3 from "../web3";
import contract from "../Contract";
import { useLocation } from "react-router-dom";

const AddProduct = () => {
  const location = useLocation();
  const account = location.state?.account;
  console.log(account);

  const [product, setProduct] = useState({
    name: "",
    id: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  console.log(product);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: account,
          to: contract.options.address,
          data: contract.methods.addCoffee(product.id, product.name, web3.utils.toWei(product.price, "ether")).encodeABI(),
        }],
      });
      alert('Product added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="grid gap-7 grid-cols-2">
      <div className="">
        <img src="https://coffee-workdo.myshopify.com/cdn/shop/files/abt-2.jpg?v=1672736581" alt="" />
      </div>
      <div className="bg-white w-[80%] px-6 rounded-sm py-9 mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product ID
            </label>
            <input
              type="text"
              name="id"
              value={product.id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (in Ether)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;