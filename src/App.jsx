import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Navbar from './assets/components/Navbar'; 
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/"];

  return (
    <>
      {/* Render Navbar except for the Login page */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
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
