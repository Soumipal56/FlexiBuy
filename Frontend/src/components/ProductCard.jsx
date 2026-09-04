import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.slug}`} className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <div className="p-8 bg-gray-50 flex justify-center items-center h-64 group-hover:scale-105 transition-transform duration-500">
        <img src={product.variants[0].images[0]} alt={product.name} className="max-h-full object-contain drop-shadow-xl" />
      </div>
      <div className="p-6">
        <p className="text-sm font-semibold text-brand-500 mb-1">{product.category}</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
        <p className="text-gray-900 font-bold mb-4">Starting from ₹{product.variants[0].price.toLocaleString('en-IN')}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
