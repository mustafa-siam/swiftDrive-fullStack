import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaArrowLeft, FaDollarSign } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
const CarDetails = () => {
    const {cars,axios,navigate}=useAppContext()
    const {id}=useParams()
    const [car,setcar]=useState(null)
    useEffect(()=>{
        setcar(cars.find(car=>car._id===id))
    },[cars,id])
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const onSubmit=async(data)=>{
          try {
            const res=await axios.post('/api/bookings/create',{
                car:id,
                pickupDate:data.pickupDate,
                returnDate:data.returnDate,
                location: car.location      
            })
            if(res.data.success){
                toast.success(res.data.message)
                navigate('/my-bookings')
            }else{
                toast.error(res.data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
    }
    return car ? (
        <div className='max-w-6xl mx-auto space-y-12 p-2'>
            <p onClick={()=>navigate(-1)} className='flex gap-1 items-center text-[#6A7282] cursor-pointer text-sm'><FaArrowLeft></FaArrowLeft> Back to all cars</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <motion.div
                initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6}}
                className='md:col-span-2'>
                  <motion.img 
                  initial={{opacity:0,scale:0.98}}
        animate={{opacity:1,scale:1}}
        transition={{duration:0.6}}
                  src={car.image} 
                   alt="car"
                   className='w-full py-3 h-[400px]'
                   />
                   <h1 className='font-semibold text-3xl '>{car.brand} {car.model}</h1>
                   <p className='text-balance text-[#6A7282]'>{car.year} * {car.category}</p>
                    <div className="divider"></div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {
                        [
                            {icon:assets.users_icon,text:`${car.seating_capacity}`},
                            {icon:assets.fuel_icon,text:`${car.fuel_type}`},
                            {icon:assets.carIcon,text:`${car.transmission}`},
                            {icon:assets.location_icon,text:`${car.location}`}
                        ].map(({icon,text})=>{
                            return (
                                <motion.div
                                initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.2}}
                                key={text} className='flex flex-col items-center bg-[#F3F4F6] gap-2 p-2 rounded-lg'>
 <img src={icon} alt="" className='w-5' />
 <p>{text}</p>
                                </motion.div>
                            )
                        })
                    }                  
                    </div>
                    <p className='py-3 text-[#6A7282]'>{car.description}</p>
                    <motion.div
                    initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.4}}
                    >
                        <h1 className='text-xl font-medium'>Features</h1>
                        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 py-3'>
                           {
                            ["Leather Seats","Panoramic Sunroof","Wireless Charging","360 Camera"].map(item=>{
                                return(<li key={item} className='flex items-center text-[#6A7282]'>
                      <img src={assets.check_icon} className='h-4 m-2' alt="" />
                      {item}
                                </li>)
                            })
                           }
                        </ul>
                    </motion.div>
                </motion.div>
                <motion.div
                initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6,delay:0.3}}
                className='shadow-lg h-max p-4'>
                    <div className='flex justify-between pb-2'>
                       <p className='flex items-center font-semibold text-2xl'><FaDollarSign/>{car.pricePerDay}</p>
                    <p className='text-[#6A7282]'>per day</p>
                    </div>
                     <div className="divider"></div>
                     <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <label >Pickup Date</label>
                        <input type="date" {...register("pickupDate", { required: "Please select a pick-up date" })} className='input mt-3'/>
                        {errors.pickupDate && (
              <p className="text-sm text-red-500">{errors.pickupDate.message}</p>)}
                        <label >Return Date</label>
                         <input type="date" {...register("returnDate", { required: "Please select a return date" })} className='input mt-3'/>
                        {errors.returnDate && (
              <p className="text-sm text-red-500">{errors.returnDate.message}</p>
            )}
                        <button type='submit' className=' bg-[#2563EB] w-full text-white rounded-xl text-sm font-medium py-3 hover:opacity-70 cursor-pointer'>Book Now</button>
                     </form>
                     <p className='text-center text-sm text-[#6A7282] mt-6'>No credit card required to reserve</p>
                </motion.div>
            </div>
        </div>
    ):<span className="loading loading-spinner loading-xl flex justify-center items-center"></span>
};

export default CarDetails;