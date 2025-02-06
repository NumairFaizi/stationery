import React from 'react';

const Add_product = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="backdrop-blur-sm bg-white/30 p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={closeModal}  
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-800 opacity-100 mb-4">
          Add Product Here
        </h1>
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Product Name"
            id="p_name"
            required
            className="w-full p-3 rounded-md text-gray-800 border-2 border-gray-300 focus:border-blue-500 focus:outline-none opacity-100"
          />
          <input
            type="text"
            placeholder="Brand"
            id="brand"
            required
            className="w-full p-3 rounded-md text-gray-800 border-2 border-gray-300 focus:border-blue-500 focus:outline-none opacity-100"
          />
          <input
            type="number"
            placeholder="Rate"
            id="rate"
            required
            className="w-full p-3 rounded-md text-gray-800 border-2 border-gray-300 focus:border-blue-500 focus:outline-none opacity-100"
          />
          <input
            type="number"
            placeholder="Quantity"
            id="qty"
            required
            className="w-full p-3 rounded-md text-gray-800 border-2 border-gray-300 focus:border-blue-500 focus:outline-none opacity-100"
          />
          <button
            type="submit"
            className="w-full p-3 rounded-md text-white border-2 bg-green-600 hover:bg-green-500 opacity-100"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_product;
