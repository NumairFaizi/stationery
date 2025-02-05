import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Navbar from './assets/components/Navbar'; 
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/"];
  

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path='/Billing' element={<Billing/>}/>
        <Route path="/Inventory" element={<Inventory />} />
      </Routes>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
