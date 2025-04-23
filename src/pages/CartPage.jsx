import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useStore from '../store/store';
import csvService from '../services/csvService';
import ProductModal from '../components/ProductModal';

// Info tooltip component
const InfoTooltip = ({ text }) => {
  return (
    <div className="group relative inline-block ml-1">
      <div className="w-4 h-4 rounded-full bg-utsa-orange text-white flex items-center justify-center text-xs cursor-help font-semibold">
        i
      </div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-utsa-orange text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-utsa-orange"></div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart, user, isAuthenticated, addOrder } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState('');

  // Calculate total (each item has quantity of 1)
  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const taxRate = 0.0825; // 8.25% tax rate
  const tax = subtotal * taxRate;
  let discountAmount = 0;
  if (appliedDiscount) {
    discountAmount = appliedDiscount.type === 'percent'
      ? subtotal * (parseFloat(appliedDiscount.amount) / 100)
      : parseFloat(appliedDiscount.amount); // ✅ force it to number
  }
  
  const total = Math.max(subtotal + tax - discountAmount, 0);// Total including tax

  const handleRemoveItem = (e, productId) => {
    e.stopPropagation(); // Prevent triggering the card click
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to checkout');
      navigate('/login');
      return;
    }
    
    setIsCheckingOut(true);
    console.log('Starting checkout process...', { cart, user });
    
    try {
      // Create an order for each item in the cart
      for (const item of cart) {
        // Find seller's email address for contact info
        const sellerInfo = await csvService.findUserById(item.sellerId);
        const sellerEmail = sellerInfo ? sellerInfo.email : 'Email not available';
        console.log('Found seller info:', { sellerInfo, sellerId: item.sellerId });
        
        // Ensure we have seller information
        if (!item.sellerId || !item.sellerName) {
          console.error('Missing seller information for item:', item);
          toast.error(`Missing seller information for ${item.title}`);
          continue;
        }
        
        // Calculate item price with tax
        const itemPrice = parseFloat(item.price);
        const itemTax = itemPrice * taxRate;
        const itemTotal = itemPrice + itemTax;
        
        // Log the exact types and values of IDs
        console.log('ID information for new order:', {
          buyerId: user.id,
          buyerIdType: typeof user.id,
          sellerId: item.sellerId,
          sellerIdType: typeof item.sellerId
        });
        
        const order = {
          productId: item.id, 
          productTitle: item.title,
          price: itemTotal,
          quantity: 1,
          tax: itemTax,
          subtotal: itemPrice,
          buyerId: String(user.id), // Ensure consistent string type
          buyerName: user.name,
          buyerEmail: user.email,
          sellerId: String(item.sellerId), // Ensure consistent string type
          sellerName: item.sellerName,
          sellerEmail: sellerEmail,
          status: 'pending',
          productImage: item.imageUrl,
          category: item.category,
          condition: item.condition
        };
        
        console.log('Creating order:', order);
        
        // Save order to CSV/localStorage
        const savedOrder = await csvService.addOrder(order);
        console.log('Order saved to CSV/localStorage:', savedOrder);
        
        // Add to Zustand store
        addOrder(savedOrder);
        console.log('Order added to store');
      }
      
      // Clear the cart
      clearCart();
      console.log('Cart cleared');
      
      toast.success('Order placed successfully!');
      navigate('/account');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to complete checkout');
    } finally {
      setIsCheckingOut(false);
    }
  };
  
  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="section-title text-8xl mb-4">Your Cart</h1>
        <p className="mb-8">Your cart is empty</p>
        <Link to="/products" className="btn btn-primary mx-auto w-48 flex items-center justify-center">
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <div>
        <h1 className="section-title text-3xl mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items (left side) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-utsa-orange">
              <div className="bg-utsa-blue text-white py-3 px-4 font-semibold">
                Cart Items ({cart.length})
              </div>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li 
                    key={item.id} 
                    className="p-4 hover:bg-utsa-orange hover:bg-opacity-5 cursor-pointer transition-colors"
                    onClick={() => handleProductClick(item)}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 mr-4 overflow-hidden rounded-lg border border-utsa-orange">
                        <img 
                          src={item.imageUrl || '/placeholder-image.jpg'} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-utsa-blue">{item.title}</p>
                        <p className="text-light-gray text-sm">{item.sellerName}</p>
                        <p className="text-utsa-orange font-semibold mt-1">
                          ${parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <button 
                          onClick={(e) => handleRemoveItem(e, item.id)}
                          className="btn-secondary text-sm py-1 px-3"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Order Summary (right side) */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-utsa-orange">
              <h2 className="section-title mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="flex items-center">
                    Tax (8.25%)
                    <InfoTooltip text="Sales tax is collected at a rate of 8.25% for all purchases in accordance with local tax regulations." />
                  </span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="flex items-center">
                    Shipping
                    <InfoTooltip text="Free shipping is offered for all campus transactions. Items are exchanged in-person at a mutually agreed campus location." />
                  </span>
                  <span className="text-success font-medium">FREE</span>
                </div>
                
                {appliedDiscount && (
                  <div className="flex justify-between">
                      <span>Discount ({appliedDiscount.code})</span>
                      <span>- ${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-primary w-full"
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </button>
              <div className="mt-6">
                <label className="block text-sm font-semibold mb-1 text-utsa-blue">Discount Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={e => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g. WELCOME10)"
                    className="input flex-1"
                  />
                  <button
                    onClick={() => {
                      const allDiscounts = csvService.getDiscounts();
                      const match = allDiscounts.find(d => d.code === discountCode.trim());

                      if (!match) {
                        setAppliedDiscount(null);
                        setDiscountError('Invalid or expired code.');
                      } else {
                        setAppliedDiscount(match);
                        setDiscountError('');
                      }
                    }}
                    className="btn btn-secondary"
                  >
                    Apply
                  </button>
                </div>
                {discountError && <p className="text-red-500 text-sm mt-1">{discountError}</p>}
                {appliedDiscount && (
                  <p className="text-green-600 mt-2 text-sm">
                    ✅ {appliedDiscount.code} applied — {appliedDiscount.type === 'percent' 
                      ? `${appliedDiscount.amount}% off`
                      : `$${appliedDiscount.amount} off`}
                  </p>
                )}
              </div>
              <div className="mt-4 text-center text-sm text-light-gray">
                <p>By checking out, you agree to meet the seller in a public location on or near the UTSA campus to complete the transaction.</p>
                <p className="mt-2">Your email will be shared with the seller to coordinate the exchange.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default CartPage; 