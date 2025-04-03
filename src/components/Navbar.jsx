import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Add_product from "./Add_product";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('login', false);
    navigate("/login");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Link to={'/'}>
            <img src={logo} alt="Logo" className="h-10 w-10 hover:cursor-pointer" />
          </Link>
          <div className="hidden md:flex space-x-6 ml-8 text-gray-700">  
            <Link to="/" className="text-sm font-medium hover:text-gray-900">
              Home
            </Link>
          
            <Link to="/Billing" className="text-sm font-medium hover:text-gray-900">
              Bill
            </Link>
            <Link to="/display-bill" className="text-sm font-medium hover:text-gray-900">
              Display Bill
            </Link>
            <Link to="/Inventory" className="text-sm font-medium hover:text-gray-900">
              Inventory
            </Link>
            <Link to="/Backup" className="text-sm font-medium hover:text-gray-900">
              Ledger
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500"
          >
            Add Product
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center text-gray-700"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/Billing" className="text-sm font-medium hover:text-gray-900">
              Bill
            </Link>
            <Link to="/Inventory" className="text-sm font-medium hover:text-gray-900">
              Inventory
            </Link>
            <Link to="/Backup" className="text-sm font-medium hover:text-gray-900">
              Ledger
            </Link>
            <button
              onClick={openModal}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500"
            >
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {isModalOpen && <Add_product closeModal={closeModal} />}
    </nav>
  );
};

export default Navbar;