import React, { useState, useEffect } from 'react';

const Billing = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [productName, setProductName] = useState('');
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

    // fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const enteredProduct = e.target.value;
    setProductName(enteredProduct);

    const product = products.find((p) => p.name.toLowerCase() === enteredProduct.toLowerCase());
    setAmount(product ? product.price : 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Billing Details:\nCustomer: ${customerName}\nEmail: ${email}\nProduct: ${productName}\nAmount: $${amount}`
    );
  };

  const handleReset = () => {
    setCustomerName('');
    setEmail('');
    setProductName('');
    setAmount(0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-xl border-2 border-gray-200/30">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-200 drop-shadow-lg">
          Billing System
        </h1>

        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-300">
          Enter Product to be Billed
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
            type="text"
            placeholder="Enter Product Name"
            value={productName}
            onChange={handleProductChange}
            className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-gray-700"
            required
          />

          <input
            type="number"
            value={amount}
            readOnly
            className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-gray-700"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg hover:from-green-400 hover:to-green-600 transition duration-300"
          >
            Submit Billing
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-lg hover:from-red-400 hover:to-red-600 transition duration-300"
          >
            Reset Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default Billing;
