import './index.css';
import React from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import Cars from './pages/cars';
import Layout from './pages/owner/Layout';
import Addcar from './pages/owner/Addcar';
import ManageCars from './pages/owner/ManageCars';
import ManageBookings from './pages/owner/ManageBookings';
import Dashboard from './pages/owner/Dashboard';
import { ToastContainer } from 'react-toastify';
const App = () => {
  const isOwnerPath=useLocation().pathname.startsWith("/owner")
  return (
    <>
    <ToastContainer></ToastContainer>
     <div data-theme="light" >
      {!isOwnerPath && <NavBar></NavBar>}
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/car-details/:id" element={<CarDetails/>} />
        <Route path="/cars" element={<Cars/>} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path='/owner' element={<Layout></Layout>}>
            <Route index element={<Dashboard/>}></Route>
            <Route  path='add-car' element={<Addcar/>}></Route>
            <Route path='manage-cars' element={<ManageCars/>}></Route>
            <Route path='manage-bookings' element={<ManageBookings/>}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
    </>
  );
};

export default App;