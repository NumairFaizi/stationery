import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar'; 
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import Backup from './pages/Backup';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import DisplayBill from './pages/DisplayBill';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/login"];
  

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path='/Billing' element={<Billing/>}/>
        <Route path='/display-bill' element={<DisplayBill/>}/>
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Backup" element={<Backup/>} />
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
