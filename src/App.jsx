import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import SellItemPage from './pages/SellItemPage';
import EditProductPage from './pages/EditProductPage';
import AdminPage from './pages/AdminPage';
import ForumPage from './pages/ForumPage';
import AboutPage from './pages/AboutPage';
import initializeAppData, { updateExistingOrdersWithEmails } from './services/initData';

function App() {
  // Initialize app data on first load
  useEffect(() => {
    initializeAppData();
    
    // Ensure all orders have email information
    updateExistingOrdersWithEmails();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sell" element={<SellItemPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<div className="text-center py-12"><h1 className="text-3xl font-bold">Page Not Found</h1></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 