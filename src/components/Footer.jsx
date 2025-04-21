import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-utsa-blue text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Rowdy Marketplace</h3>
            <p className="text-sm">
              A place for UTSA students to buy and sell items within the campus community.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-utsa-orange">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-utsa-orange">Browse Products</Link>
              </li>
              <li>
                <Link to="/sell" className="text-sm hover:text-utsa-orange">Sell an Item</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-utsa-orange">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-sm mb-2">UTSA Main Campus</p>
            <p className="text-sm mb-2">San Antonio, TX</p>
            <p className="text-sm">support@rowdymarketplace.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Rowdy Marketplace. All rights reserved.</p>
          <p className="mt-1">This is a test application. Not for actual use.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 