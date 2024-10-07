import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#40342F] rounded-lg shadow-lg p-4 w-full max-w-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="bg-white text-black rounded-full p-1 text-xs">{product.discount}</span>
        </div>
        <div className="flex space-x-2">
          
        </div>
      </div>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover mt-4 mb-2 rounded-md"
      />
      <h2 className="text-white text-lg font-bold">
        {product.brand}
      </h2>
      <p className="text-white text-sm mb-2">{product.category}</p>
     
      <div className="flex justify-between items-center mt-4">
        <div className="text-white">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-bold">{product.discountPrice} USD</span>
              <span className="text-sm line-through ml-2">{product.originalPrice} USD</span>
            </>
          ) : (
            <span className="text-xl font-bold">{product.originalPrice} USD</span>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;
