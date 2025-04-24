import { useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/store';
import toast from 'react-hot-toast';
import ProductModal from './ProductModal';

const ProductCard = ({ product, isOnSale = false, originalPrice, salePrice }) => {
  const { addToCart, user } = useStore();
  const [showModal, setShowModal] = useState(false);
  
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event
    addToCart(product);
  };
  
  const handleCardClick = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  // Format price to display with 2 decimal places
  // Ensure price is treated as a number before calling toFixed
  const formattedPrice = parseFloat(product.price).toFixed(2);
  
  // Check if current user is the seller
  const isUserSeller = user && user.id === product.sellerId;
  
  return (
    <>
      <div 
        className="group card hover:shadow-xl transition-all cursor-pointer hover:border-utsa-orange hover:scale-[1.02]" 
        onClick={handleCardClick}
      >
        <div className="overflow-hidden rounded-lg">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg transition-colors duration-200 text-utsa-blue group-hover:text-utsa-orange">{product.title}</h3>
            {isOnSale ? (
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
                <span className="text-utsa-orange font-bold">${salePrice}</span>
                <span className="text-xs text-white bg-utsa-orange px-2 py-0.5 rounded-full mt-1">On Sale</span>
              </div>
            ) : (
              <span className="text-utsa-orange font-bold">${formattedPrice}</span>
            )}
          </div>
          
          <p className="text-sm text-light-gray mt-1">{product.category}</p>
          
          <p className="line-clamp-2 text-sm mt-2 h-10">
            {product.description}
          </p>
          
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs bg-white px-2 py-1 rounded-full text-black">
              {product.condition}
            </span>
            <span className="text-xs text-light-gray">
              Seller: {product.sellerName}
            </span>
          </div>
          
          <div className="mt-4">
            {isUserSeller ? (
              <Link 
                to={`/edit-product/${product.id}`}
                className="w-full btn btn-secondary flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent card click event
              >
                Edit Your Listing
              </Link>
            ) : (
              <button 
                onClick={handleAddToCart}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      
      {showModal && (
        <ProductModal 
          product={product} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default ProductCard; 