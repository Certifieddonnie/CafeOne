import React from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const products = [
    {
      brand: "1Zpresso",
      name: "Electric Grinder",
      category: "Grinder",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      colors: ["Grey"],
      originalPrice: 782,
      discountPrice: null,
      discount: "-17%",
      soldOut: false,
    },
    {
      brand: "Coffee WorkDo",
      name: "Hot Coffee Mug",
      category: "Mug",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      colors: ["Blue"],
      originalPrice: 340,
      discountPrice: 236,
      discount: "-41%",
      soldOut: false,
    },
    {
        brand: "1Zpresso",
        name: "Electric Grinder",
        category: "Grinder",
        image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        colors: ["Grey"],
        originalPrice: 782,
        discountPrice: null,
        discount: "-17%",
        soldOut: false,
      },
      {
        brand: "Coffee WorkDo",
        name: "Hot Coffee Mug",
        category: "Mug",
        image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        colors: ["Blue"],
        originalPrice: 340,
        discountPrice: 236,
        discount: "-41%",
        soldOut: false,
      },
    // Add more products here
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
