import React, { useEffect, useState } from 'react';
import Title from '../components/title';
import { assets } from '../assets/assets';
import CarData from '../components/CarData';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
const Cars = () => {
    const [searchParams]=useSearchParams()
    const pickupLocation=searchParams.get("pickupLocation")
    const pickupDate=searchParams.get("pickupDate")
    const returnDate=searchParams.get("returnDate")
    const isSearchData=pickupLocation&&pickupDate&&returnDate
    const [filteredCars,setfilteredCars]=useState([])
    const {cars,axios}=useAppContext()
    const searchCarAvailability=async()=>{
          const {data}=await axios.post('/api/bookings/check-availability',{location:pickupLocation,pickupDate,returnDate})
          if(data.success){
               setfilteredCars(data.availvalecars)
               if(data.availvalecars.length===0){
                toast("No cars available")
               }
               return null;
          }
    }
    useEffect(()=>{
       isSearchData && searchCarAvailability()
    },[])
    const [input,setinput]=useState("")
    const applyFiltered=()=>{
        if(input===''){
            setfilteredCars(cars)
            return null;
        }
        const filtered=cars.slice().filter(car=>{
        return car.brand.toLowerCase().includes(input.toLowerCase())
        || car.model.toLowerCase().includes(input.toLowerCase())
        || car.category.toLowerCase().includes(input.toLowerCase())
        || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setfilteredCars(filtered)
    }
    useEffect(()=>{
        cars.length>0 && !isSearchData && applyFiltered()
    },[input,cars])
    
    return (
        <motion.div
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6}}
        className='max-w-6xl mx-auto space-y-12 p-2'>
            <motion.div 
            initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6,delay:0.2}}
            className='bg-[#F1F5F9] py-20 flex flex-col items-center w-full gap-8'>
                <Title title={"Available Cars"} subtitle={"Browse our selection of premium vehicles available for your next adventure"}></Title>
                <div className='flex items-center bg-white rounded-full py-4 px-4 max-w-140 w-full'>
                    <img src={assets.search_icon} alt="" className='mr-2' />
                    <input onChange={(e)=>setinput(e.target.value)} value={input} type="text" placeholder='Search by make, model, or features' className='w-full outline-none text-gray-500'/>
                    <img src={assets.filter_icon} alt="" className='ml-2' />
                </div>
            </motion.div>
            <motion.div 
            initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.6,delay:0.4}}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                   filteredCars.map((car,idx)=>(
                    <motion.div 
                     initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.4,delay:0.4*idx}}
                    key={car._id}>
                       <CarData car={car}></CarData>
                    </motion.div>
                   ))
                }
            </motion.div>
        </motion.div>
    );
};

export default Cars;