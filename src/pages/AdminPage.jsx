import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useStore from '../store/store';
import { resetAppData } from '../services/initData';
import csvService from '../services/csvService';


// Placeholder views for now
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const { updateListing, removeListing } = useStore();

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await csvService.getProducts();
      setProducts(allProducts);
    };
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await csvService.removeProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      removeListing(id);
    }
  };

  return (
    <div className="space-y-4 text-utsa-blue">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="w-full text-sm text-left border">
          <thead className="bg-utsa-blue text-white">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Seller</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-2 w-20">
                  <img src={product.imageUrl} alt={product.title} className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="p-2">{product.title}</td>
                <td className="p-2">${parseFloat(product.price).toFixed(2)}</td>
                <td className="p-2">{product.sellerName}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2 space-x-2">
                  <Link to={`/edit-product/${product.id}`} className="btn btn-secondary text-sm px-2 py-1">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn bg-error text-white text-sm px-2 py-1 hover:bg-utsa-orange hover:shadow-md transition-all duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const AdminSells = () => {
  const [sells, setSells] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ 
    name: '', 
    amount: '', 
    type: 'percent', 
    scope: 'category', 
    startDate: '', 
    endDate: '', 
    minPurchase: '', 
    maxDiscount: '',
    usageLimit: '',
    description: '',
    userId: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Load sells data
    const stored = csvService.getSells?.() || [];
    const normalized = stored.map(sell => ({
      ...sell,
      amount: parseFloat(sell.amount), // ensure it's a number
      type: sell.type?.toLowerCase(),  // just in case
      scope: sell.scope || 'category',
      name: sell.name || '',
      startDate: sell.startDate || '',
      endDate: sell.endDate || '',
      minPurchase: sell.minPurchase || '',
      maxDiscount: sell.maxDiscount || '',
      usageLimit: sell.usageLimit || '',
      description: sell.description || '',
      userId: sell.userId || ''
    }));
    setSells(normalized);
    
    // Load categories from products
    const loadCategories = async () => {
      try {
        const products = await csvService.getProducts();
        // Extract unique categories
        const uniqueCategories = [...new Set(products.map(p => p.category))].filter(Boolean);
        setCategories(uniqueCategories.sort());
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    
    // Load users for selection
    const loadUsers = () => {
      try {
        const allUsers = csvService.getUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };
    
    loadCategories();
    loadUsers();
  }, []);

  const handleAddOrEdit = () => {
    if (!form.name || !form.amount) return alert('Name and amount fields are required');

    const newSell = {
      id: editingId || Date.now().toString(),
      name: form.name,
      amount: parseFloat(form.amount),
      type: form.type,
      scope: form.scope,
      startDate: form.startDate,
      endDate: form.endDate,
      minPurchase: form.minPurchase,
      maxDiscount: form.maxDiscount,
      usageLimit: form.usageLimit,
      description: form.description,
      userId: form.userId,
      userName: form.userId ? users.find(u => u.id === form.userId)?.name || 'Unknown' : '',
      createdAt: new Date().toISOString()
    };

    const updatedSells = editingId
      ? sells.map(s => (s.id === editingId ? newSell : s))
      : [...sells, newSell];

    csvService.saveSells(updatedSells);
    setSells(updatedSells);
    setForm({ 
      name: '', 
      amount: '', 
      type: 'percent', 
      scope: 'category', 
      startDate: '', 
      endDate: '', 
      minPurchase: '', 
      maxDiscount: '',
      usageLimit: '',
      description: '',
      userId: ''
    });
    setEditingId(null);
  };

  const handleEdit = (sell) => {
    setEditingId(sell.id);
    setForm({ 
      name: sell.name, 
      amount: sell.amount, 
      type: sell.type, 
      scope: sell.scope,
      startDate: sell.startDate || '',
      endDate: sell.endDate || '',
      minPurchase: sell.minPurchase || '',
      maxDiscount: sell.maxDiscount || '',
      usageLimit: sell.usageLimit || '',
      description: sell.description || '',
      userId: sell.userId || ''
    });
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this deal?')) return;
    const updated = sells.filter(s => s.id !== id);
    csvService.saveSells(updated);
    setSells(updated);
  };

  // Find user name by ID
  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="space-y-6 text-utsa-blue">
      <h2 className="text-xl text-utsa-blue font-bold mb-4">Create New Sale</h2>

      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Discount Type*</label>
            <select
              className="input w-full"
              value={form.scope}
              onChange={(e) => setForm({ ...form, scope: e.target.value })}
            >
              <option value="category">Category Discount</option>
              <option value="product">Product Discount</option>
            </select>
          </div>

          <div className="space-y-2">
            {form.scope === 'category' ? (
              <>
                <label className="block text-sm font-medium">Select Category*</label>
                <select
                  className="input w-full"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <label className="block text-sm font-medium">Product Name*</label>
                <input
                  className="input w-full"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Discount Value*</label>
            <div className="flex">
              <input
                className="input w-full rounded-r-none"
                placeholder="Amount"
                type="number"
                min="0"
                step={form.type === 'percent' ? "1" : "0.01"}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
              <select
                className="input rounded-l-none border-l-0 bg-gray-100"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="percent">%</option>
                <option value="fixed">$</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Start Date</label>
            <input
              className="input w-full"
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Assigned To</label>
            <select
              className="input w-full"
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
            >
              <option value="">Unassigned</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="input w-full"
              placeholder="Additional details about this sale"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="1"
            />
          </div>
          
          <div className="space-y-2 flex items-end">
            <button 
              onClick={handleAddOrEdit} 
              className="btn btn-primary h-10 w-full flex items-center justify-center"
            >
              {editingId ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Sale
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-8 flex items-center">
        <span>Active Sales</span>
        <span className="ml-3 bg-utsa-blue text-white text-xs px-2 py-1 rounded-full">{sells.length}</span>
      </h3>
      
      {sells.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No sales promotions created yet.</p>
          <p className="text-sm text-gray-400 mt-1">Create your first sale using the form above.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sells.map(sell => (
            <li
              key={sell.id}
              className="p-4 border rounded bg-white shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-0.5 bg-utsa-blue bg-opacity-10 text-utsa-blue rounded text-xs mr-2">
                      {sell.scope === 'category' ? 'CATEGORY' : 'PRODUCT'}
                    </span>
                    <h4 className="font-semibold text-utsa-blue text-lg">
                      {sell.name}
                    </h4>
                  </div>
                  <p className="text-lg font-bold text-utsa-orange mt-1">
                    {sell.type === 'percent' ? `${sell.amount}% off` : `$${sell.amount} off`}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(sell)} 
                    className="btn btn-secondary text-sm flex items-center h-9 px-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(sell.id)} 
                    className="btn bg-red-500 text-white text-sm flex items-center h-9 px-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
              
              {sell.description && (
                <p className="text-sm text-utsa-blue mb-2 italic">{sell.description}</p>
              )}
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-2 text-gray-600">
                {sell.startDate && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Start: {new Date(sell.startDate).toLocaleDateString()}
                  </div>
                )}
                
                {sell.userId && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Owner: {sell.userName || getUserName(sell.userId)}
                  </div>
                )}
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Created: {new Date(sell.createdAt).toLocaleDateString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const allUsers = csvService.getUsers();
    setUsers(allUsers);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updated = users.filter(u => u.id !== id);
      csvService.saveUsers(updated);
      setUsers(updated);
    }
  };

  const startEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      isAdmin: user.isAdmin === 'true' || user.isAdmin === true
    });
  };

  const handleSave = () => {
    const updatedUsers = users.map(u => u.id === editingUser ? {
      ...u,
      ...editForm
    } : u);

    csvService.saveUsers(updatedUsers);
    setUsers(updatedUsers);
    setEditingUser(null);
    setEditForm({});
  };

  return (
    <div className="space-y-4 text-utsa-blue">
      <h2 className="text-xl text-utsa-blue font-semibold">User Management</h2>

      <table className="w-full border text-left text-sm">
        <thead className="bg-utsa-blue text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Admin</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              {editingUser === user.id ? (
                <>
                  <td className="p-2">
                    <input
                      className="input w-full"
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="input w-full"
                      value={editForm.email}
                      onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <select
                      className="input"
                      value={editForm.isAdmin}
                      onChange={e => setEditForm({ ...editForm, isAdmin: e.target.value === 'true' })}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </td>
                  <td className="p-2 space-x-2">
                    <button onClick={handleSave} className="btn btn-primary text-sm px-2 py-1">Save</button>
                    <button onClick={() => setEditingUser(null)} className="btn bg-gray-300 text-sm px-2 py-1">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.isAdmin === true || user.isAdmin === 'true' ? 'Yes' : 'No'}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => startEdit(user)} className="btn btn-secondary text-sm px-2 py-1">Edit</button>
                    {!(user.isAdmin === true || user.isAdmin === 'true') && (
                      <button onClick={() => handleDelete(user.id)} className="btn bg-red-500 text-white text-sm px-2 py-1 hover:bg-utsa-orange hover:shadow-md transition-all duration-200">
                        Delete
                      </button>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const allOrders = csvService.getOrders();
    setOrders(allOrders);
  }, []);

  useEffect(() => {
    if (selectedOrder && !selectedOrder.imageUrl) {
      const allProducts = csvService.getProducts();
      const product = allProducts.find(p => p.id === selectedOrder.productId);
      if (product) {
        setSelectedOrder(prev => ({ ...prev, imageUrl: product.imageUrl }));
      }
    }
  }, [selectedOrder]);

  const handleCancel = (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() }
        : order
    );
    csvService.saveOrders(updatedOrders);
    setOrders(updatedOrders);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    });

  return (
    <div className="space-y-6 text-utsa-blue">
      <h2 className="text-xl text-utsa-blue font-semibold">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <table className="w-full border text-sm text-left">
          <thead className="bg-utsa-blue text-white">
            <tr>
              <th className="p-2">Buyer</th>
              <th className="p-2">Seller</th>
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.buyerName}</td>
                <td className="p-2">{order.sellerName}</td>
                <td className="p-2">{order.productTitle}</td>
                <td className="p-2">${parseFloat(order.price).toFixed(2)}</td>
                <td className="p-2 capitalize text-sm font-medium">
                  {order.status}
                </td>
                <td className="p-2">{formatDate(order.createdAt)}</td>
                <td className="p-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="btn btn-secondary text-xs px-2 py-1"
                    >
                      View
                    </button>
                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="btn bg-red-500 text-white text-xs px-2 py-1"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full relative">
                        <button
                          onClick={() => setSelectedOrder(null)}
                          className="absolute top-2 right-3 text-gray-500 hover:text-black"
                        >
                          ✕
                        </button>

                        <h2 className="text-xl font-bold mb-4">Order Details</h2>

                        <div className="flex gap-4">
                          <img
                            src={selectedOrder.imageUrl || '/images/placeholder.jpg'}
                            alt={selectedOrder.productTitle}
                            className="w-28 h-28 object-cover rounded border"
                          />
                          <div className="flex-1 space-y-2">
                            <div><strong>Product:</strong> {selectedOrder.productTitle}</div>
                            <div><strong>Price:</strong> ${parseFloat(selectedOrder.price).toFixed(2)}</div>
                            <div><strong>Status:</strong> {selectedOrder.status}</div>
                          </div>
                        </div>

                        <div className="mt-4 space-y-1 text-sm text-gray-700">
                          <div><strong>Buyer:</strong> {selectedOrder.buyerName}</div>
                          <div><strong>Seller:</strong> {selectedOrder.sellerName}</div>
                          <div><strong>Order ID:</strong> {selectedOrder.id}</div>
                          <div><strong>Placed:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</div>
                          {selectedOrder.updatedAt && (
                            <div><strong>Last Updated:</strong> {new Date(selectedOrder.updatedAt).toLocaleString()}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const allQuestions = await csvService.getQuestions();
        // Sort questions by date, newest first
        allQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQuestions(allQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
        toast.error('Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const filteredQuestions = questions.filter(q => q.id !== id);
      csvService.saveQuestions(filteredQuestions);
      setQuestions(filteredQuestions);
      toast.success('Question deleted');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === id) {
        return { ...q, status: newStatus };
      }
      return q;
    });
    
    csvService.saveQuestions(updatedQuestions);
    setQuestions(updatedQuestions);
    toast.success(`Question marked as ${newStatus}`);
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="space-y-6 text-utsa-blue">
      <h2 className="text-xl text-utsa-blue font-semibold">User Questions</h2>
      
      {questions.length === 0 ? (
        <p className="text-center py-4">No questions submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-utsa-blue text-white">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Question</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(q => (
                <tr key={q.id} className="border-b hover:bg-white">
                  <td className="p-3">
                    {new Date(q.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="p-3">{q.name}</td>
                  <td className="p-3">
                    <a href={`mailto:${q.email}`} className="text-utsa-blue hover:text-utsa-orange">
                      {q.email}
                    </a>
                  </td>
                  <td className="p-3">{q.question}</td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      q.status === 'pending' ? 'bg-utsa-orange text-white' :
                      q.status === 'answered' ? 'bg-success text-white' :
                      'bg-utsa-blue text-white'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="p-2 space-x-2">
                    {q.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(q.id, 'answered')}
                        className="btn btn-secondary text-xs px-1.5 py-0.5 mb-2"
                      >
                        Answered
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="btn bg-error text-white text-sm px-2 py-1 hover:bg-utsa-orange hover:shadow-md transition-all duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
const AdminDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [form, setForm] = useState({ code: '', amount: '', type: 'percent' });

  useEffect(() => {
    const all = csvService.getDiscounts();
    setDiscounts(all);
  }, []);

  const handleAdd = () => {
    if (!form.code || !form.amount) return toast.error("Fill all fields");
    const newDiscount = csvService.addDiscount(form);
    setDiscounts(prev => [...prev, newDiscount]);
    setForm({ code: '', amount: '', type: 'percent' });
    toast.success("Discount added");
  };

  const handleDelete = (id) => {
    csvService.deleteDiscount(id);
    setDiscounts(prev => prev.filter(d => d.id !== id));
    toast.success("Discount deleted");
  };

  return (
    <div className="text-utsa-blue">
      <h2 className="text-lg text-utsa-blue font-semibold mb-4">Create New Discount</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Code (e.g. SPRING10)"
          className="input"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
        />
        <input 
          type="number" 
          placeholder="Amount"
          className="input"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
        <select 
          className="input"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="percent">Percent (%)</option>
          <option value="fixed">Fixed Amount ($)</option>
        </select>
      </div>
      <button className="btn btn-primary mb-8" onClick={handleAdd}>Add Discount</button>

      <h2 className="text-lg text-utsa-blue font-semibold mb-3">Existing Discount Codes</h2>
      <div className="space-y-3">
        {discounts.length === 0 ? (
          <p className="text-light-gray">No discount codes created yet.</p>
        ) : discounts.map(discount => (
          <div key={discount.id} className="flex text-utsa-blue justify-between items-center border p-4 rounded">
            <div>
              <p className="font-semibold text-utsa-blue">{discount.code}</p>
              <p className="text-sm">
                {discount.type === 'percent' ? `${discount.amount}% off` : `$${discount.amount} off`}
              </p>
            </div>
            <button 
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-utsa-orange hover:shadow-md transition-all duration-200"
              onClick={() => handleDelete(discount.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

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
        navigate('/');
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
      case 'questions': return <AdminQuestions />;
      case 'discounts': return <AdminDiscounts />;
      case 'sells': return <AdminSells />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto text-utsa-blue">
      <h1 className="text-3xl font-bold text-utsa-blue mb-6">Admin Dashboard</h1>
      
      {/* Admin info (unchanged) */}
      <div className="bg-white text-utsa-blue rounded-lg shadow p-6 mb-12">
        <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        {['products', 'users', 'orders', 'questions', 'discounts', 'sells'].map(tab => (
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
      <div className="bg-white text-utsa-blue rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl text-utsa-blue font-semibold mb-4">System Actions</h2>
        <div className="border-t pt-4">
          <h3 className="text-lg text-utsa-blue font-medium mb-2">Reset Application Data</h3>
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

      
    </div>
  );
};

export default AdminPage;