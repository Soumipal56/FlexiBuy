import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] group">
        <img 
          src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Smartphones" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
          <span className="text-brand-500 font-bold tracking-wider uppercase mb-4 block">FlexiBuy Exclusive</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">The Future is Here.</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-8 drop-shadow">
            Discover our latest collection of premium smartphones with flexible, mutual-fund-backed EMI plans.
          </p>
          <button className="bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 px-8 rounded-full w-fit transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/30">
            Shop Collection
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Smartphones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
