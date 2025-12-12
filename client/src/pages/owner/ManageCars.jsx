import React, { useEffect, useState } from 'react';
import { assets, dummyCarData } from '../../assets/assets';
import TitleOwner from '../../components/owner/TitleOwner';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ManageCars = () => {
    const [cars,setcars]=useState([])
    const {axios,isOwner}=useAppContext()
    const fetchCars=async()=>{
      try {
        const {data}=await axios.get('/api/owner/cars')
        if(data.success){
          setcars(data.cars)
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
        
    }
    useEffect(()=>{
      isOwner &&  fetchCars()
    },[])
    const toggoleCarAvailavility=async(carId)=>{
         try {
        const {data}=await axios.post('/api/owner/toggle-car',{carId})
        if(data.success){
          fetchCars();
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    const deleteCar=async(carId)=>{
      try {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const {data}=await axios.post('/api/owner/delete-car',{carId})
                if (data.success) {
                    toast.success(data.message)
                    fetchCars();
                }
                else{
                toast.error(data.message)
            }
        }});
      } catch (error) {
        toast.error(error.message)
      }
    }
    return (
        <div className='p-6 space-y-12'>
            <TitleOwner title={"Manage Cars"} subtitle={"View all listed cars, update their details, or remove them from the booking platform"}></TitleOwner>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table border-2">

    <thead>
      <tr className='border-b-2'>
        <th>Car</th>
        <th>Category</th>
        <th>Price</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        cars.map(car=>{
          return(
            <tr key={car._id} className='border-b-2'>
        <td className='flex items-center gap-2'>
          <div className="tooltip" data-tip={`${car.brand} ${car.model}`}>
         <img src={car.image} 
          alt="car" 
          className='w-14 h-14'
          /> 
          </div>
          <div className='hidden lg:block'> 
            <h1>{car.brand} {car.model}</h1>
            <p className='text-[#64748B] text-xs'>{car.seating_capacity} seats {car.transmission}</p>
          </div>
         
          </td>
        <td>
          {car.category}
          </td>
        <td>${car.pricePerDay}/day</td>
        <td>
          <p className={`p-1 flex items-center justify-center rounded-full text-xs ${car.isAvaliable===true ? "bg-[#BBFFD782] text-[#06A764]" : "text-red-600 bg-red-200"}`}>{car.isAvaliable ? "Available" : "NotAvailable"}</p>
        </td>
        <td className='flex justify-center items-center'>
          <img 
          onClick={()=>toggoleCarAvailavility(car._id)} 
          src={car.isAvaliable ? assets.eye_icon :assets.eye_close_icon} alt="" 
          className='cursor-pointer'
          />
          <img 
          onClick={()=>deleteCar(car._id)}
          className='cursor-pointer'
          src={assets.delete_icon}
           alt="" 
          />
        </td>
      </tr>
          )
        })
      }
      
    </tbody>
  </table>
</div>   
        </div>
    );
};

export default ManageCars;