// Sample product categories
export const categories = [
  'Electronics',
  'Books',
  'Clothing',
  'Furniture',
  'Sports Equipment',
  'School Supplies',
  'Dorm Essentials',
  'Video Games',
  'Musical Instruments',
  'Miscellaneous'
];

// Sample products data
export const products = [
  {
    id: '1',
    title: 'TI-84 Plus Calculator',
    description: 'Lightly used graphing calculator, perfect for calculus classes',
    price: 75.00,
    category: 'School Supplies',
    condition: 'Used - Good',
    sellerId: '2',
    sellerName: 'Jane Smith',
    imageUrl: '/images/products/calculator.jpg',
    createdAt: '2023-03-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Chemistry Textbook',
    description: 'Introductory Chemistry, 5th Edition. No highlights or notes.',
    price: 45.00,
    category: 'Books',
    condition: 'Like New',
    sellerId: '3',
    sellerName: 'Mike Johnson',
    imageUrl: '/images/products/textbook-chem.jpg',
    createdAt: '2023-03-16T14:45:00Z'
  },
  {
    id: '3',
    title: 'Dorm Microwave',
    description: 'Small microwave, works perfectly. Moving out and need to sell.',
    price: 30.00,
    category: 'Dorm Essentials',
    condition: 'Used - Fair',
    sellerId: '4',
    sellerName: 'Sarah Williams',
    imageUrl: '/images/products/microwave.jpg',
    createdAt: '2023-03-17T09:15:00Z'
  },
  {
    id: '4',
    title: 'UTSA Hoodie',
    description: 'Medium sized UTSA hoodie, worn only a few times',
    price: 25.00,
    category: 'Clothing',
    condition: 'Used - Excellent',
    sellerId: '2',
    sellerName: 'Jane Smith',
    imageUrl: '/images/products/hoodie.jpg',
    createdAt: '2023-03-18T16:20:00Z'
  },
  {
    id: '6',
    title: 'Desk Lamp',
    description: 'Adjustable desk lamp with USB charging port',
    price: 20.00,
    category: 'Dorm Essentials',
    condition: 'Used - Excellent',
    sellerId: '4',
    sellerName: 'Sarah Williams',
    imageUrl: '/images/products/lamp.jpg',
    createdAt: '2023-03-20T13:25:00Z'
  }
];

// Sample users data
export const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@rowdymarketplace.com',
    password: 'admin123', // In a real app, this would be hashed
    isAdmin: true,
    createdAt: '2023-03-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123', // In a real app, this would be hashed
    isAdmin: false,
    createdAt: '2023-03-10T08:45:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'password123', // In a real app, this would be hashed
    isAdmin: false,
    createdAt: '2023-03-11T09:30:00Z'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    password: 'password123', // In a real app, this would be hashed
    isAdmin: false,
    createdAt: '2023-03-12T10:15:00Z'
  }
];

// Sample orders data
export const orders = [
  {
    id: '1',
    buyerId: '2',
    buyerName: 'Jane Smith',
    sellerId: '3',
    sellerName: 'Mike Johnson',
    productId: '2',
    productTitle: 'Chemistry Textbook',
    price: 45.00,
    status: 'completed',
    createdAt: '2023-03-25T15:30:00Z',
    completedAt: '2023-03-27T14:20:00Z'
  },
  {
    id: '2',
    buyerId: '3',
    buyerName: 'Mike Johnson',
    sellerId: '4',
    sellerName: 'Sarah Williams',
    productId: '3',
    productTitle: 'Dorm Microwave',
    price: 30.00,
    status: 'pending',
    createdAt: '2023-03-26T10:45:00Z'
  },
  {
    id: '3',
    buyerId: '4',
    buyerName: 'Sarah Williams',
    sellerId: '2',
    sellerName: 'Jane Smith',
    productId: '4',
    productTitle: 'UTSA Hoodie',
    price: 25.00,
    status: 'completed',
    createdAt: '2023-03-27T09:15:00Z',
    completedAt: '2023-03-28T16:40:00Z'
  }
];

// Export all sample data
export default {
  categories,
  products,
  users,
  orders
}; 