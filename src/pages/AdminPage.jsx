import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useStore from '../store/store';
import { resetAppData } from '../services/initData';

// Placeholder views for now
const AdminProducts = () => <div>📦 Product management coming soon</div>;
const AdminUsers = () => <div>👤 User management coming soon</div>;
const AdminOrders = () => <div>📋 Order history coming soon</div>;
const AdminDiscounts = () => <div>🏷️ Discount code management coming soon</div>;

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useStore();
  const [isResetting, setIsResetting] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!user?.isAdmin) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4 text-error">Access Denied</h1>
        <p className="mb-6">You do not have permission to access this page.</p>
        <button onClick={() => navigate('/')} className="btn-primary">Return to Home</button>
      </div>
    );
  }

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all application data? This action cannot be undone.')) {
      setIsResetting(true);
      try {
        resetAppData();
        toast.success('Application data has been reset successfully!');
        logout();
        navigate('/login');
      } catch (error) {
        console.error('Error resetting data:', error);
        toast.error('Failed to reset application data');
        setIsResetting(false);
      }
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'products': return <AdminProducts />;
      case 'users': return <AdminUsers />;
      case 'orders': return <AdminOrders />;
      case 'discounts': return <AdminDiscounts />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        {['products', 'users', 'orders', 'discounts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t font-semibold ${
              activeTab === tab ? 'bg-utsa-orange text-white' : 'text-utsa-blue hover:underline'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        {renderActiveTab()}
      </div>

      {/* System actions (unchanged) */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">System Actions</h2>
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Reset Application Data</h3>
          <p className="text-light-gray mb-4">
            This will delete all existing data and reinitialize the app with sample data.
          </p>
          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-error text-white rounded hover:bg-opacity-90"
            disabled={isResetting}
          >
            {isResetting ? 'Resetting...' : 'Reset All Data'}
          </button>
        </div>
      </div>

      {/* Admin info (unchanged) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default AdminPage;