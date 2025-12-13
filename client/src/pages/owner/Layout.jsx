import React, { useEffect } from 'react';
import SideBar from '../../components/owner/SideBar';
import { Outlet } from 'react-router-dom';
import NavbarOwner from '../../components/owner/NavbarOwner';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
    const {isOwner,navigate}=useAppContext();
    useEffect(()=>{
        if(!isOwner){
            navigate('/')
        }
    },[isOwner])
    return (
        <div className='min-h-screen flex flex-col'>
        <NavbarOwner></NavbarOwner>
            <div className='flex'>
                <div className='w-14 md:w-60 shrink-0'>
<SideBar></SideBar>
                </div>
                
                <div className='flex-1 min-w-0 p-4 overflow-x-hidden'>
 <Outlet></Outlet>
                </div>
               
            </div>
        </div>
    );
};

export default Layout;