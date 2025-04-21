import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useStore from '../store/store';
import { resetAppData } from '../services/initData';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useStore();
  const [isResetting, setIsResetting] = useState(false);
  
  // Check if user is admin
  const isAdmin = user && user.isAdmin;
  
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all application data? This action cannot be undone.')) {
      setIsResetting(true);
      try {
        resetAppData();
        toast.success('Application data has been reset successfully!');
        
        // Logout user since their data may have changed
        logout();
        navigate('/login');
      } catch (error) {
        console.error('Error resetting data:', error);
        toast.error('Failed to reset application data');
        setIsResetting(false);
      }
    }
  };
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4 text-error">Access Denied</h1>
        <p className="mb-6">You do not have permission to access this page.</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Return to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">System Actions</h2>
        
        <div className="space-y-4">
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-2">Reset Application Data</h3>
            <p className="text-light-gray mb-4">
              This will delete all existing data and reinitialize the app with sample data.
              This action cannot be undone.
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
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
        <p className="mb-2">
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p className="mb-2">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p className="mb-2">
          <span className="font-medium">User ID:</span> {user.id}
        </p>
        <p>
          <span className="font-medium">Account Created:</span> {new Date(user.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AdminPage; 