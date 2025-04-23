import csvService from './csvService';
import sampleData from '../data/sampleData';

// Initialize the app with sample data if none exists
export const initializeAppData = () => {

  const initialized = localStorage.getItem('hasInitialized');
  if (initialized === 'true') {
    console.log('[init] Skipping init — already initialized');
    return;
  }
    // Check if products, users, and orders already exist
    if (!csvService.getDiscounts().length) {
      console.log('[init] Adding sample discounts...');
      csvService.saveDiscounts(sampleData.discounts);
    }
  console.log('🔧 Initializing sample data...');
  // Save sample data if not already present
  csvService.saveProducts(sampleData.products);
  csvService.saveUsers(sampleData.users);
  csvService.saveOrders(sampleData.orders);
  // Update any existing orders to include email information
  updateExistingOrdersWithEmails();
  // Mark as initialized
  localStorage.setItem('hasInitialized', 'true');
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
  localStorage.setItem('hasInitialized', 'false'); // to allow fresh init
  csvService.saveProducts(sampleData.products);
  csvService.saveUsers(sampleData.users);
  csvService.saveOrders(sampleData.orders);
  csvService.saveDiscounts(sampleData.discounts);
  updateExistingOrdersWithEmails();
};

export default initializeAppData; 