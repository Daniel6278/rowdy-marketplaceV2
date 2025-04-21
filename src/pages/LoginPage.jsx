import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useStore from '../store/store';
import csvService from '../services/csvService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (error) setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const { email, password } = formData;
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }
    
    try {
      // Find user with matching email
      const foundUser = csvService.findUserByEmail(email);
      
      if (!foundUser) {
        setError('User not found');
        setIsLoading(false);
        return;
      }
      
      // Check password (in a real app, you would use proper password hashing)
      if (foundUser.password !== password) {
        setError('Invalid password');
        setIsLoading(false);
        return;
      }
      
      // Login successful
      login(foundUser);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-error rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="your.name@my.utsa.edu"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="Your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-utsa-blue hover:underline">
              Register here
            </Link>
          </p>
        </div>
        
        
      </div>
    </div>
  );
};

export default LoginPage; 