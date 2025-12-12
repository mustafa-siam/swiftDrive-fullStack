import React, { useEffect, useState } from 'react';
import { assets, dummyMyBookingsData } from '../assets/assets';
import Title from '../components/title';
import { FaDollarSign, FaRegCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';
import { IoLocation } from "react-icons/io5";
import moment from 'moment';
import { motion } from 'motion/react';
const MyBookings = () => {
    const {axios,user}=useAppContext()
    const [bookings,setbookings]=useState([]);
    const fetchBookings=async()=>{
          try {
            const {data}=await axios.get("/api/bookings/user")
            console.log("RESPONSE FROM SERVER:", data);
            if(data.success){
                setbookings(data.bookings)
            }
            else{
                toast.error(data.message)
            }
          } catch (error) {
            toast.error(error.message);
          }
    }
    useEffect(()=>{
       user && fetchBookings()
    },[user])
    return (
        <motion.div
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6}}
        >
            <Title title={"My Bookings"} subtitle={"View and manage your car bookings"}></Title>
            <div className='grid grid-cols-1 gap-7 my-8 max-w-6xl mx-auto space-y-12 p-2'>
                {
                    bookings.map((booking,idx)=>{
                        return (<motion.div
                        initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.2*idx}}
                        key={idx} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border-2 border-[#DDE1EE] rounded-lg '>
                           <div className='md:col-span-1 flex flex-col'>
                           <div className='rounded-md overflow-hidden h-full'>
                       <img src={booking.car.image} alt="" 
                       className='w-full h-48'/>
                      </div>
                              <h1 className='font-semibold text-xl '>{booking.car.brand} {booking.car.model}</h1>
                   <p className='text-sm text-[#6A7282]'>{booking.car.year} * {booking.car.category} * {booking.car.location}</p>
                           </div>
                           <div className='md:col-span-2'>
                            <div className='flex items-center gap-2'>
                                  <p className='bg-[#F3F4F6] text-sm px-3 py-1 rounded-md'>Booking {idx+1}</p>
                                  <p className={` px-2 py-1 rounded-full text-sm ${booking.status==="confirmed"? "bg-[#BBFFD782] text-[#06A764]" : "text-red-600 bg-red-200"}`}>{booking.status}</p>
                            </div>
                              <div className='py-2'>
                                <div className='flex gap-2 items-center '>
                                   <p><FaRegCalendarAlt className='text-blue-600'/></p>
                                   <p className='text-[#1F2937A6]'>Rental Period</p>
                                   </div>
                                  <p className='text-sm font-medium pt-1'>
  {moment(booking.pickupDate).format("DD-MM-YYYY")} - {moment(booking.returnDate).format("DD-MM-YYYY")}
</p>
                              </div>
                              <div className='py-2'>
                                <div className='flex gap-2 items-center '>
                                   <p><IoLocation className='text-blue-600'/></p>
                                   <p className='text-[#1F2937A6]'>Pick-up Location</p>
                                   </div>
                                   <p className='text-sm font-medium pt-1'>{booking.location}</p>
                              </div>
                           </div>
                           <div className='md:grid-cols-1 space-y-2'>
                                  <p className='text-sm text-[#1F293799]'>Total Price</p>
                                  <p className='flex items-center text-2xl font-semibold text-[#2563EB]'><FaDollarSign/>{booking.price}</p>
                                  <p className='text-sm text-[#1F293799]'>
                                     Booked on {moment(booking.createdAt).format("DD-MM-YYYY")}
                                  </p>
                           </div>
                        </motion.div>)
                    })
                }
            </div>
        </motion.div>
    );
};

export default MyBookings;