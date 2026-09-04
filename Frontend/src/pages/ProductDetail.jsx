import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import VariantSelector from '../components/VariantSelector';
import EMIPlanList from '../components/EMIPlanList';
import ProceedButton from '../components/ProceedButton';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(null); // start unselected to test ProceedButton

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${slug}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // Reset selected plan when variant changes because EMI plans might differ
  useEffect(() => {
    setSelectedPlanIdx(null);
  }, [selectedVariantIdx]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>;
  if (error) return <div className="text-red-500 text-center py-12 text-xl font-medium">{error}</div>;
  if (!product) return null;

  const selectedVariant = product.variants[selectedVariantIdx];
  const emiPlans = selectedVariant.emiPlans || [];

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-500">
      <Link to="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to store
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Column: Product Image & Details */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden">
          <div className="w-full mb-6">
            <span className="text-xs font-bold text-red-500 tracking-wider uppercase mb-2 block">New</span>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-gray-500 font-medium">{selectedVariant.label}</p>
          </div>
          
          <div className="w-full h-96 flex justify-center items-center my-8 relative">
            <img 
              src={selectedVariant.images[0]} 
              alt={`${product.name} ${selectedVariant.color}`} 
              className="max-h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          <VariantSelector 
            variants={product.variants} 
            selectedIdx={selectedVariantIdx} 
            onSelect={setSelectedVariantIdx} 
          />
        </div>

        {/* Right Column: Pricing & EMI Plans */}
        <div className="flex flex-col pt-4">
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="text-4xl font-bold text-gray-900">{formatCurrency(selectedVariant.price)}</h2>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-lg text-gray-400 line-through font-medium">{formatCurrency(selectedVariant.mrp)}</span>
              )}
            </div>
            <p className="text-gray-600 font-medium text-lg">EMI plans backed by mutual funds</p>
          </div>
          
          <EMIPlanList 
            plans={emiPlans} 
            selectedPlanIdx={selectedPlanIdx} 
            onSelect={setSelectedPlanIdx} 
          />
          
          <ProceedButton 
            disabled={selectedPlanIdx === null} 
            onClick={() => alert(`Proceeding with plan: ${emiPlans[selectedPlanIdx].months} months`)} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
