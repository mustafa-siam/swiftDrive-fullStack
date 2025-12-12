import React from 'react';
import Title from './title';
import { dummyCarData } from '../assets/assets';
import CarData from './CarData';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { easeOut, motion } from 'motion/react';
const Featuredcar = () => {
    const {cars}=useAppContext()
    const navigaion=useNavigate()
    return (
        <motion.div
        initial={{y:40,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:1,delay:0.5}}
        className='space-y-10 max-w-6xl mx-auto p-2'>
        <motion.div 
        initial={{y:40,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:1,ease:easeOut}}>
            <Title title={"Featured Vehicles"} subtitle={"Explore our selection of premium vehicles available for your next adventure."}></Title>
        </motion.div>
        <motion.div 
        initial={{y:100,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:1,delay:0.5}}
        className='grid grid-cols-2 md:grid-cols-3 gap-6'>
            {
              cars.slice(0,3).map(car=>(
                <motion.div  key={car._id}
                initial={{y:40,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:1,ease:easeOut}}
                >
                 <CarData car={car}></CarData>
                </motion.div>
              )       
              )
            }
        </motion.div>
        <div className='flex w-full items-center justify-center'>
            <motion.button 
            initial={{y:20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:0.4,delay:0.6}}
            onClick={()=>{navigaion("/cars");scrollTo(0,0)}} className='btn text-base flex items-center gap-7'>Explore all cars <FaArrowRight></FaArrowRight> </motion.button>
        </div>
        </motion.div>       
    );
};

export default Featuredcar;