const Inventory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-8">
      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto backdrop-blur-xl border-2 border-gray-200/30">
        <h1 className="text-4xl font-extrabold text-center text-gray-200 mb-6 drop-shadow-lg">
          Stock Report
        </h1>

        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-8">
          Current Stock Information
        </h2>

        <table className="min-w-full bg-white text-left text-black border-collapse">
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
            <tr className="hover:bg-gray-700 transition-all duration-200">
              <td className="py-3 px-4">A4 notebook </td>
              <td className="py-3 px-4">Classmate</td>
              <td className="py-3 px-4">10</td>
              <td className="py-3 px-4">40</td>
              <td className="py-3 px-4">400</td>
            </tr>
            <tr className="hover:bg-gray-700 transition-all duration-200">
              <td className="py-3 px-4">Another Product</td>
              <td className="py-3 px-4">Another Brand</td>
              <td className="py-3 px-4">5</td>
              <td className="py-3 px-4">$15</td>
              <td className="py-3 px-4">$75</td>
            </tr>
          </tbody>
        </table>

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
