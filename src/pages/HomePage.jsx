import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import csvService from '../services/csvService';
import homeBanner from '../assets/homeBanner.jpg';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        // Get all products and select a few as featured
        const allProducts = await csvService.getProducts();
        
        // Sort by creation date (newest first) and take the first 4
        const featured = allProducts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
          
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="text-white py-16 px-4 rounded-lg mb-12 relative"
        style={{
          backgroundImage: `url(${homeBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Rowdy Marketplace</h1>
          <p className="text-xl mb-8 text-white">Buy and sell items within the UTSA community</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="btn bg-white text-utsa-blue hover:bg-gray-100"
            >
              Browse Products
            </Link>
            <Link 
              to="/sell" 
              className="btn bg-utsa-orange hover:bg-opacity-90"
            >
              Sell an Item
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-utsa-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
            <p>Sign up for free and set up your profile in just a few minutes.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-utsa-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-xl font-semibold mb-2">Browse or List Items</h3>
            <p>Find what you need or list items you want to sell to the community.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-utsa-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-xl font-semibold mb-2">Meet Up & Exchange</h3>
            <p>Connect with buyers or sellers on or near the UTSA campus and complete your transaction safely.</p>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recently Added</h2>
          <Link to="/products" className="text-utsa-blue hover:underline">
            View All
          </Link>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      {/* CTA */}
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-utsa-blue">Ready to Get Started?</h2>
        <p className="mb-6">Join the UTSA community marketplace today.</p>
        <Link 
          to="/register" 
          className="btn-primary py-3 px-6 rounded-full inline-block"
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 