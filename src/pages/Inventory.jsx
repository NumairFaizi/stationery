import React, { useState, useEffect } from 'react';

const Inventory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Mocked API call to fetch stock data (replace with real API call)
    const fetchStockData = async () => {
      try {
        const response = await fetch('/api/stock'); // Replace with actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setStockData(data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch stock data');
        }
      } catch (error) {
        setError('Error fetching stock data');
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
        <div className="text-white text-xl">Loading Stock Data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-8">
      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto backdrop-blur-xl border-2 border-gray-200/30">
        <h1 className="text-4xl font-extrabold text-center text-gray-200 mb-6 drop-shadow-lg">
          Stock Report
        </h1>

        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-8">
          Current Stock Information
        </h2>

        <table className="min-w-full bg-white text-left text-gray-100 border-collapse">
          <thead>
            <tr className="border-b border-gray-500">
              <th className="py-3 px-4 text-lg font-medium">Product</th>
              <th className="py-3 px-4 text-lg font-medium">Brand</th>
              <th className="py-3 px-4 text-lg font-medium">Quantity</th>
              <th className="py-3 px-4 text-lg font-medium">Price</th>
              <th className="py-3 px-4 text-lg font-medium">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((product) => (
              <tr key={product.id} className="hover:bg-gray-700 transition-all duration-200">
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.brand}</td>
                <td className="py-3 px-4">{product.quantity}</td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4">${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer or additional actions */}
        <div className="mt-8 text-center">
          <button className="py-2 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition duration-300">
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
