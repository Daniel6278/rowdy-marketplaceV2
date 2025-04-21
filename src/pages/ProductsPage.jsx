import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import csvService from '../services/csvService';
import { categories } from '../data/sampleData';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await csvService.getProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  useEffect(() => {
    // Apply filters and sorting
    let result = [...products];
    
    // Category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Price range filter
    if (priceRange.min !== '') {
      result = result.filter(product => parseFloat(product.price) >= parseFloat(priceRange.min));
    }
    
    if (priceRange.max !== '') {
      result = result.filter(product => parseFloat(product.price) <= parseFloat(priceRange.max));
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priceLow':
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'priceHigh':
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, sortBy, priceRange]);
  
  const handleClearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSortBy('latest');
    setPriceRange({ min: '', max: '' });
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-utsa-blue">Browse Products</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters (Left Sidebar on large screens) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-utsa-blue">Filters</h2>
            
            {/* Search */}
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium mb-1 text-utsa-blue">
                Search
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter keywords..."
                className="input"
              />
            </div>
            
            {/* Category filter */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium mb-1 text-utsa-blue">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="input"
                  min="0"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="input"
                  min="0"
                />
              </div>
            </div>
            
            {/* Sort */}
            <div className="mb-6">
              <label htmlFor="sort" className="block text-sm font-medium mb-1">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                <option value="latest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
            
            {/* Clear Filters */}
            <button
              onClick={handleClearFilters}
              className="w-full py-2 px-4 border border-utsa-blue text-utsa-blue rounded-full hover:bg-utsa-orange hover:text-white transition-colors flex items-center justify-center"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Product Grid - Each ProductCard now includes a modal that appears on click */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">No Products Found</h3>
              <p className="text-black">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 