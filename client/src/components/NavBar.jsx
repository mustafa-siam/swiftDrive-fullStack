import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import Login from './Login';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
const NavBar = () => {
  const {setShowLogin,user,logOut,isOwner,setIsOwner,showLogin,axios}=useAppContext()
  const changeRole=async()=>{
    try {
      const {data}=await axios.post('/api/owner/change-role');
      if(data.success){
        setIsOwner(true)
        toast.success(data.message)
      }
      else{
         toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const navlinks=<>
  <li><Link to={"/"}>Home</Link></li>
  <li><Link to={"/cars"}>Cars</Link></li>
  <li><Link to={"/my-bookings"}>My Bookings</Link></li>
  {
    isOwner ? <li><Link to={"/owner"}>Dashboard</Link></li> : <button onClick={()=>changeRole()} className='cursor-pointer'>List Cars</button>
  }
  
  </>
    return (
        <motion.div
        initial={{y:-20,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.5}}
        className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
          navlinks
        }
      </ul>
    </div>
    <motion.div
    whileHover={{scale:1.05}}
    className='flex items-center'>
<img src={assets.logo} alt="" />
    <Link to={"/"} className="ml-2 text-xl">SwiftDrive</Link>
    </motion.div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navlinks}
    </ul>
  </div>
  <div className="navbar-end gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <button onClick={() =>{user ? logOut() : setShowLogin(true)}} className="btn bg-primary text-white">{user ?  'LogOut' : 'LogIn'}</button>
{showLogin && (
          <div className="modal modal-open" onClick={() => setShowLogin(false)}>
            <div onClick={e => e.stopPropagation()}>
              <Login />
            </div>
          </div>
        )}
  </div>
</motion.div>
    );
};

export default NavBar;