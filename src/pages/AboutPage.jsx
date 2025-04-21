import React from 'react';

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-utsa-orange">About Rowdy Marketplace</h1>
      
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-utsa-orange">
        <h2 className="text-2xl font-semibold mb-4 text-utsa-blue">Our Mission</h2>
        <p className="mb-4 text-utsa-blue">
          Rowdy Marketplace is a dedicated platform for UTSA students to buy, sell, and exchange items within the campus community. 
          Our mission is to create a safe, convenient, and sustainable marketplace that helps students save money and reuse items.
        </p>
        <p className="mb-4 text-utsa-blue">
          Whether you're looking for textbooks, electronics, furniture, or school supplies, Rowdy Marketplace provides an easy way to 
          connect with fellow students and find what you need at affordable prices.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-utsa-blue">
        <h2 className="text-2xl font-semibold mb-4 text-utsa-blue">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-utsa-orange rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">1</div>
            <h3 className="font-semibold mb-2">Create an Account</h3>
            <p className="text-utsa-blue">Sign up with your UTSA email to join our community of buyers and sellers.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-utsa-orange rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">2</div>
            <h3 className="font-semibold mb-2">Browse or List Items</h3>
            <p className="text-utsa-blue">Search for items you need or list items you want to sell to other students.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-utsa-orange rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">3</div>
            <h3 className="font-semibold mb-2">Connect & Exchange</h3>
            <p className="text-utsa-blue">Arrange to meet on campus to complete your transaction safely.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-utsa-orange">
        <h2 className="text-2xl font-semibold mb-4 text-utsa-blue">Our Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-utsa-blue">
          <li><span className="font-semibold">Student-only marketplace</span> - Verified UTSA students only for a safer experience</li>
          <li><span className="font-semibold">Category browsing</span> - Find exactly what you need with our organized categories</li>
          <li><span className="font-semibold">Image uploads</span> - List items with photos to increase your chances of selling</li>
          <li><span className="font-semibold">Forum discussions</span> - Ask questions and get answers from our team of admins</li>
        </ul>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md border-t-4 border-utsa-blue">
        <h2 className="text-2xl font-semibold mb-4 text-utsa-blue">Contact Us</h2>
        <p className="mb-4 text-utsa-blue">
          Have questions, suggestions, or need assistance? Reach out to our team at:
        </p>
        <p className="font-semibold text-utsa-orange">support@rowdymarketplace.utsa.edu</p>
      </div>
    </div>
  );
}

export default AboutPage; 