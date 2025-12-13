import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
const Banner = () => {
    return (
        <motion.div 
        initial={{opacity:0,y:50}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.6}}
        className="flex flex-col md:flex-row justify-between  gap-12 px-2 md:px-7 md:py-12 py-3 md:rounded-2xl overflow-hidden  bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-auto space-y-12 p-2 ">
            <div className='space-y-5 flex-1'>
                <h1 className='text-white text-3xl font-semibold'>Do You Own a Luxury Car?</h1>
                <p className='text-white font-medium text-base'>Monetize your vehicle effortlessly by listing it on CarRental.We take care of insurance, driver verification, and secure payments — so you can earn passive income, stress-free.</p>
                <motion.button 
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                className='btn bg-white text-[#0257FF]'>List your car</motion.button>
            </div>
            <div className='flex-1 mt-10'>
                <motion.img 
                initial={{opacity:0,x:50}}
                whileInView={{opacity:1,x:0}}
                transition={{duration:0.6,delay:0.4}}
                src={assets.banner_car_image} className='max-h-44' alt="" /></div>
        </motion.div>
    );
};

export default Banner;