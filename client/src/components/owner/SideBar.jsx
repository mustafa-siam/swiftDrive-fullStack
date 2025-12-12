import React, { useState } from 'react';
import { assets} from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const SideBar = () => {
    const {user,axios,fetchUser}=useAppContext();
    const location=useLocation()
    const [img,setimg]=useState("")
    const updateImg=async()=>{
        try {
          const formData=new FormData()
          formData.append('image',img)
          const {data}=await axios.post('/api/owner/update-image',formData)
          if(data.success){
            fetchUser()
            toast.success(data.message)
            setimg('')
          }
          else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
    }
    const links = [
    { path: '/owner', label: 'Dashboard', icon: assets.dashboardIcon,clrdicon:assets.dashboardIconColored },
    { path: '/owner/add-car', label: 'Add Car', icon: assets.addIcon,clrdicon:assets.addIconColored},
    { path: '/owner/manage-cars', label: 'Manage Cars', icon: assets.carIcon,clrdicon:assets.carIconColored },
    { path: '/owner/manage-bookings', label: 'Manage Bookings', icon: assets.listIcon,clrdicon:assets.listIconColored },
  ];
    return (
        <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-14 md:max-w-60 w-full border-r border-[#E2E8F0] text-sm'>
            <div className='group relative'>
                <label htmlFor='image'>
                    <img src={img ? URL.createObjectURL(img):user?.image?user?.image : assets.upload_icon} alt="" className='h-10 md:h-30 w-10 md:w-30 rounded-full mx-auto'/>
                    <input type="file" id="image" accept='image/*' hidden onChange={(e)=>setimg(e.target.files[0])} />
                    <div className='absolute hidden top-0 right-0 left-0 bottom-0  bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
                       <img src={assets.edit_icon} width={25} alt="" />
                    </div>
                </label>
            </div>
            {
                img&&(
                    <button onClick={updateImg} className='absolute top-0 right-0 flex p-2 gap-2 bg-primary/10 text-primary cursor-pointer'>Save <img src={assets.check_icon} width={13}  alt="" /></button>
                )
            }
            <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>
            <div className='w-full mt-12'>
              {
                links.map(link=>{
                    const active=location.pathname==link.path;
                    return(
                         <Link key={link.path} to={link.path}>
              <div
                className={`flex justify-center md:justify-start items-center gap-2 py-3 px-2 md:px-4 
                hover:bg-primary/5 transition-all duration-200
                ${active ? 'bg-primary/10 text-primary border-r-4 border-primary' : ''}`}
              >
                {
                    active ? <img
                  src={link.clrdicon}
                  alt=""
                  className="w-5"
                /> : <img
                  src={link.icon}
                  alt=""
                  className="w-5"
                />
                }
                
                <p className='max-md:hidden'>{link.label}</p>
              </div>
            </Link>
                    )
                })
              }
                
            </div>
        </div>
    );
};

export default SideBar;