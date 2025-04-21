import csvService from './csvService';
import sampleData from '../data/sampleData';

// Initialize the app with sample data if none exists
export const initializeAppData = () => {
  // Check if data already exists in localStorage
  const existingProducts = csvService.getProducts();
  const existingUsers = csvService.getUsers();
  const existingOrders = csvService.getOrders();
  
  // If no products exist, initialize with sample data
  if (existingProducts.length === 0) {
    console.log('Initializing sample products data...');
    csvService.saveProducts(sampleData.products);
  }
  
  // If no users exist, initialize with sample data
  if (existingUsers.length === 0) {
    console.log('Initializing sample users data...');
    csvService.saveUsers(sampleData.users);
  }
  
  // If no orders exist, initialize with sample data
  if (existingOrders.length === 0) {
    console.log('Initializing sample orders data...');
    csvService.saveOrders(sampleData.orders);
  }
  
  // Update any existing orders to include email information
  updateExistingOrdersWithEmails();
};

// Function to add missing email fields to any existing orders
export const updateExistingOrdersWithEmails = () => {
  try {
    // Get all users and orders
    const users = csvService.getUsers();
    const orders = csvService.getOrders();
    
    if (orders.length === 0) return true;
    
    // Create a map of user IDs to emails
    const userEmailMap = {};
    users.forEach(user => {
      userEmailMap[user.id] = user.email;
    });
    
    // Check if we need to update any orders
    let needsUpdate = false;
    const updatedOrders = orders.map(order => {
      // Skip if order already has both email fields
      if (order.buyerEmail && order.sellerEmail) {
        return order;
      }
      
      needsUpdate = true;
      const buyerEmail = order.buyerEmail || userEmailMap[order.buyerId] || '';
      const sellerEmail = order.sellerEmail || userEmailMap[order.sellerId] || '';
      
      return {
        ...order,
        buyerEmail,
        sellerEmail
      };
    });
    
    // Only save if there were changes
    if (needsUpdate) {
      console.log('Updating orders with missing email information...');
      csvService.saveOrders(updatedOrders);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating orders with emails:', error);
    return false;
  }
};

// Reset all app data (for testing)
export const resetAppData = () => {
  csvService.saveProducts(sampleData.products);
  csvService.saveUsers(sampleData.users);
  csvService.saveOrders(sampleData.orders);
  updateExistingOrdersWithEmails();
};

export default initializeAppData; 