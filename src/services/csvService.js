import Papa from 'papaparse';

// Helper function to save data to localStorage
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Helper function to get data from localStorage
const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Convert array of objects to CSV
const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  return Papa.unparse(data);
};

// Parse CSV to array of objects
const parseCSV = (csv) => {
  if (!csv) return [];
  
  const result = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true
  });
  
  return result.data;
};

// Save data to CSV in localStorage
export const saveData = (key, data) => {
  const csv = convertToCSV(data);
  localStorage.setItem(`csv_${key}`, csv);
  return data;
};

// Load data from CSV in localStorage
export const loadData = (key, defaultData = []) => {
  const csv = localStorage.getItem(`csv_${key}`);
  return csv ? parseCSV(csv) : defaultData;
};

// Products operations
export const getProducts = () => loadData('products', []);
export const saveProducts = (products) => saveData('products', products);
export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = { 
    ...product, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString() 
  };
  saveProducts([...products, newProduct]);
  return newProduct;
};

export const updateProduct = (product) => {
  const products = getProducts();
  const productIndex = products.findIndex(p => p.id === product.id);
  
  if (productIndex === -1) {
    throw new Error('Product not found');
  }
  
  // Preserve the original creation date
  const { createdAt } = products[productIndex];
  const updatedProduct = {
    ...product,
    createdAt,
    updatedAt: new Date().toISOString()
  };
  
  products[productIndex] = updatedProduct;
  saveProducts(products);
  return updatedProduct;
};

export const removeProduct = (productId) => {
  const products = getProducts();
  const filteredProducts = products.filter(product => product.id !== productId);
  saveProducts(filteredProducts);
  return filteredProducts;
};

// Users operations
export const getUsers = () => loadData('users', []);
export const saveUsers = (users) => saveData('users', users);
export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const findUserById = (id) => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const addUser = (user) => {
  const users = getUsers();
  const newUser = { 
    ...user, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString() 
  };
  saveUsers([...users, newUser]);
  return newUser;
};

export const updateUser = (userId, updatedData) => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Don't allow changing the ID or creation date
  const { id, createdAt } = users[userIndex];
  const updatedUser = { 
    ...users[userIndex],
    ...updatedData,
    id, // Preserve the original ID
    createdAt, // Preserve the original creation date
    updatedAt: new Date().toISOString()
  };
  
  users[userIndex] = updatedUser;
  saveUsers(users);
  return updatedUser;
};

// Orders operations
export const getOrders = () => loadData('orders', []);
export const saveOrders = (orders) => saveData('orders', orders);
export const addOrder = (order) => {
  const orders = getOrders();
  const newOrder = { 
    ...order, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: order.status || 'pending'
  };
  saveOrders([...orders, newOrder]);
  return newOrder;
};

export const updateOrderStatus = (orderId, status) => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) {
    throw new Error('Order not found');
  }
  
  const updatedOrder = { 
    ...orders[orderIndex], 
    status, 
    updatedAt: new Date().toISOString() 
  };
  
  orders[orderIndex] = updatedOrder;
  saveOrders(orders);
  
  // If order is marked as completed, remove the product from available products
  if (status === 'completed') {
    const productId = updatedOrder.productId;
    if (productId) {
      removeProduct(productId);
    }
  }
  
  return updatedOrder;
};

// Export the service functions
export default {
  saveData,
  loadData,
  getProducts,
  saveProducts,
  addProduct,
  updateProduct,
  removeProduct,
  getUsers,
  saveUsers,
  findUserByEmail,
  findUserById,
  addUser,
  updateUser,
  getOrders,
  saveOrders,
  addOrder,
  updateOrderStatus
}; 