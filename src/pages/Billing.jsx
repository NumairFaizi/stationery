import React, { useState, useEffect } from 'react';

const Billing = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Billing Details:\nCustomer: ${customerName}\nEmail: ${email}\nAmount: $${amount}\nProduct: ${selectedProduct}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-xl border-2 border-gray-200/30">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-200 drop-shadow-lg">
          Billing System
        </h1>

        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-300">
          Customer Billing Form
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-gray-700"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-gray-700"
            required
          />

          <input
            type="number"
            placeholder="Billing Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-gray-700"
            required
          />

          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-gray-700"
            required
          >
            <option value="" disabled>
              Select a Product
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg hover:from-green-400 hover:to-green-600 transition duration-300"
          >
            Submit Billing
          </button>

          <input
            type="reset"
            className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-lg hover:from-red-400 hover:to-red-600 transition duration-300"
          />
        </form>
      </div>
    </div>
  );
};

export default Billing;
