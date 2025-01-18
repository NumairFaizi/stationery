import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col items-start w-full bg-gradient-to-r from-blue-700 to-teal-600 p-6 text-white">
        <h1 className="mt-2 text-2xl font-semibold">Inventory Management</h1>
        <h2 className="text-base mt-2 font-medium">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        <div className="col-span-12 md:col-span-3 bg-gray-800 p-4 rounded-lg">
          <div className="mb-6">
            <h3 className="text-xl font-bold">Value of Stock</h3>
            <p className="text-3xl font-bold mt-2">₹ 00.00</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Stock Purchases</h3>
            <ul>
              <li className="flex justify-between">
                <span>Unfulfilled</span>
                <span className="font-bold">0</span>
              </li>
              <li className="flex justify-between mt-2">
                <span>Received</span>
                <span className="font-bold">0</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Total Products', count: 0, color: 'text-green-500' },
              { title: 'Low Stock', count: 0, color: 'text-yellow-500' },
              { title: 'Out of Stock', count: 0, color: 'text-red-500' },
              { title: 'Suppliers', count: 0, color: 'text-purple-500' },
            ].map((card, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
              >
                <div className="mr-4">
                  <div className={`text-4xl ${card.color}`}>
                    <i className="fas fa-box"></i>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">{card.title}</p>
                  <p className="text-2xl font-bold">{card.count}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-800 p-6 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
