

import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      navigate("/products");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <a href="/products">
        <div className="text-2xl font-bold text-gray-800">VA-SHOP</div>

</a>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/products" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/postproducts" className="text-gray-700 hover:text-blue-600">Add Product</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          <Link to="/carts" className="text-gray-700 hover:text-blue-600">Cart</Link>
          <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">Logout</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={showMenu} className="text-3xl">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {menu && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-2 z-40">
          <Link to="/products" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/postproducts" className="block text-gray-700 hover:text-blue-600">Add Product</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600">About Us</Link>
          <Link to="/register" className="block text-gray-700 hover:text-blue-600">Register</Link>
          <Link to="/carts" className="block text-gray-700 hover:text-blue-600">Cart</Link>
          <button onClick={handleLogout} className="block text-gray-700 hover:text-red-500">Logout</button>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default Navbar;


    