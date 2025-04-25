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
  },
  {
    id: '7',
    title: 'Computer Science Algorithms Textbook',
    description: 'Introduction to Algorithms, 3rd Edition. Some highlighting on key chapters.',
    price: 50.00,
    category: 'Books',
    condition: 'Used - Good',
    sellerId: '3',
    sellerName: 'Mike Johnson',
    imageUrl: '/images/products/csAlgs.jpg',
    createdAt: '2023-04-02T11:30:00Z'
  },
  {
    id: '8',
    title: 'Nintendo Switch',
    description: 'Nintendo Switch console with dock and two controllers. Works perfectly.',
    price: 220.00,
    category: 'Video Games',
    condition: 'Used - Excellent',
    sellerId: '2',
    sellerName: 'Jane Smith',
    imageUrl: '/images/products/nin.jpg',
    createdAt: '2023-04-05T16:45:00Z'
  },
  {
    id: '9',
    title: 'Basketball',
    description: 'Official size basketball, barely used. Still has good grip.',
    price: 15.00,
    category: 'Sports Equipment',
    condition: 'Used - Good',
    sellerId: '4',
    sellerName: 'Sarah Williams',
    imageUrl: '/images/products/basketball.jpg',
    createdAt: '2023-04-10T09:20:00Z'
  },
  {
    id: '10',
    title: 'Electric Guitar',
    description: 'Fender Squier Stratocaster, great for beginners. Comes with small practice amp.',
    price: 180.00,
    category: 'Musical Instruments',
    condition: 'Used - Good',
    sellerId: '3',
    sellerName: 'Mike Johnson',
    imageUrl: '/images/products/guitar.jpg',
    createdAt: '2023-04-15T14:10:00Z'
  },
  {
    id: '11',
    title: 'Dorm Refrigerator',
    description: 'Mini fridge with freezer compartment. 3.2 cubic feet capacity.',
    price: 75.00,
    category: 'Dorm Essentials',
    condition: 'Used - Fair',
    sellerId: '2',
    sellerName: 'Jane Smith',
    imageUrl: '/images/products/minifridge.jpg',
    createdAt: '2023-04-18T10:35:00Z'
  },
  {
    id: '12',
    title: 'Scientific Calculator',
    description: 'Basic scientific calculator, perfect for intro science courses',
    price: 15.00,
    category: 'School Supplies',
    condition: 'Used - Good',
    sellerId: '4',
    sellerName: 'Sarah Williams',
    imageUrl: '/images/products/scientific.jpg',
    createdAt: '2023-04-20T08:50:00Z'
  },
  {
    id: '13',
    title: 'UTSA T-Shirt',
    description: 'Large size UTSA orange t-shirt from last year\'s homecoming',
    price: 10.00,
    category: 'Clothing',
    condition: 'Used - Good',
    sellerId: '3',
    sellerName: 'Mike Johnson',
    imageUrl: '/images/products/utsashirt.webp',
    createdAt: '2023-04-22T15:15:00Z'
  },
  {
    id: '14',
    title: 'Coffee Maker',
    description: '5-cup coffee maker with programmable timer. Makes great coffee!',
    price: 25.00,
    category: 'Dorm Essentials',
    condition: 'Used - Excellent',
    sellerId: '2',
    sellerName: 'Jane Smith',
    imageUrl: '/images/products/Coffee.jpeg',
    createdAt: '2023-04-25T11:40:00Z'
  },
  {
    id: '15',
    title: 'Economics Textbook',
    description: 'Principles of Economics, 8th Edition. No markings inside.',
    price: 40.00,
    category: 'Books',
    condition: 'Like New',
    sellerId: '4',
    sellerName: 'Sarah Williams',
    imageUrl: '/images/products/Econ.webp',
    createdAt: '2023-04-28T09:05:00Z'
  },
  {
    id: '16',
    title: 'Desk Chair',
    description: 'Ergonomic desk chair with adjustable height. Very comfortable for studying.',
    price: 65.00,
    category: 'Furniture',
    condition: 'Used - Good',
    sellerId: '3',
    sellerName: 'Mike Johnson',
    imageUrl: '/images/products/deskChair.jpg',
    createdAt: '2023-05-01T13:25:00Z'
  },
  {
    id: '17',
    title: 'Bluetooth Speaker',
    description: 'Portable JBL Bluetooth speaker with great sound quality. Battery lasts 8+ hours.',
    price: 35.00,
    category: 'Electronics',
    condition: 'Used - Excellent',
    sellerId: '2',
    sellerName: 'Jane Smith',
    imageUrl: '/images/products/speaker.webp',
    createdAt: '2023-05-05T16:30:00Z'
  },
  {
    id: '18',
    title: 'Tennis Racket',
    description: 'Wilson tennis racket, used for one season. Grip is still in good condition.',
    price: 30.00,
    category: 'Sports Equipment',
    condition: 'Used - Good',
    sellerId: '4',
    sellerName: 'Sarah Williams',
    imageUrl: '/images/products/tennis.jpg',
    createdAt: '2023-05-08T10:15:00Z'
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
    email: 'jane@my.utsa.edu',
    password: 'password123', // In a real app, this would be hashed
    isAdmin: false,
    createdAt: '2023-03-10T08:45:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@my.utsa.edu',
    password: 'password123', // In a real app, this would be hashed
    isAdmin: false,
    createdAt: '2023-03-11T09:30:00Z'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@my.utsa.edu',
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

// Sample sells data
export const sells = [
  {
    id: '1',
    name: 'Dorm Essentials',
    type: 'percent',
    amount: 15,
    scope: 'category',
    createdAt: '2024-04-01T12:00:00Z'
  },
  {
    id: '2',
    name: 'TI-84 Plus Calculator',
    type: 'fixed',
    amount: 10,
    scope: 'product',
    createdAt: '2024-04-02T15:30:00Z'
  },
  {
    id: '3',
    name: 'Clothing',
    type: 'percent',
    amount: 20,
    scope: 'category',
    createdAt: '2024-04-05T09:15:00Z'
  }
];

// Sample discounts data
export const discounts = [
  {
    id: "1",
    code: "SPRING10",
    amount: 10, // as percent
    type: "percent",// support both types
    active: true,
    createdAt: "2024-04-22T12:00:00Z"
  },
  {
    id: '2',
    code: 'FREESHIP',
    amount: 5.00, // flat amount
    type: 'fixed',
    active: true,
    createdAt: "2024-04-22T12:00:00Z"
  }
];

// Sample questions data
export const questions = [
  {
    id: '1',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    question: 'How do I cancel an order that I placed by mistake?',
    category: 'Orders',
    status: 'pending',
    createdAt: '2023-04-01T10:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    question: 'Is there a way to contact a seller before placing an order?',
    category: 'General',
    status: 'answered',
    createdAt: '2023-04-02T15:45:00Z'
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john@example.com',
    question: 'How long does it typically take for a seller to respond to a purchase request?',
    category: 'Shopping',
    status: 'pending',
    createdAt: '2023-04-03T09:15:00Z'
  }
];

// Export all sample data
export default {
  discounts,
  categories,
  products,
  users,
  orders,
  questions,
  sells
}; 