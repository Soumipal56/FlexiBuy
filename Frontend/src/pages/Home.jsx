import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Home = () => {
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
    <div>
      <h1 className="text-3xl font-bold mb-8">Latest Smartphones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <Link to={`/products/${product.slug}`} key={product._id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-8 bg-gray-50 flex justify-center items-center h-64 group-hover:scale-105 transition-transform duration-500">
              <img src={product.variants[0].imageUrl} alt={product.name} className="max-h-full object-contain drop-shadow-xl" />
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold text-brand-500 mb-1">{product.brand}</p>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-500 text-sm mb-4">Available in {product.variants.length} finishes</p>
              <div className="flex items-center gap-2">
                {product.variants.map((v, i) => (
                  <div key={i} className="w-4 h-4 rounded-full border border-gray-300 shadow-inner" style={{ backgroundColor: v.color }}></div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
