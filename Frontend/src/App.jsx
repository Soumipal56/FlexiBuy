import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/products" className="text-2xl font-bold text-gray-900 tracking-tight">1Fi Store</Link>
          </div>
        </header>
        
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-50 border-t py-6 text-center text-gray-500 text-sm">
          &copy; 2026 1Fi Internship
        </footer>
      </div>
    </Router>
  );
}

export default App;
