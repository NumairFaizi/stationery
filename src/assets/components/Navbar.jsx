import React, { useState } from 'react';
import logo from '../logo.png';
import Add_product from './Add_product';  // Import the modal component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility state

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Logging out...");
  };

  const openModal = () => setIsModalOpen(true);  // Open the modal
  const closeModal = () => setIsModalOpen(false);  // Close the modal

  return (
    <nav className="bg-white shadow-md py-2">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <div className="flex space-x-6 text-gray-700">
            <a href="../pages/Add_product" className="text-sm font-medium hover:text-gray-900">Dashboard</a>
            <a href="#team" className="text-sm font-medium hover:text-gray-900">Team</a>
            <a href="#projects" className="text-sm font-medium hover:text-gray-900">Projects</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
          <button
            onClick={openModal}  // Open modal when button is clicked
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Only show modal when isModalOpen is true */}
      {isModalOpen && <Add_product closeModal={closeModal} />}
    </nav>
  );
};

export default Navbar;
