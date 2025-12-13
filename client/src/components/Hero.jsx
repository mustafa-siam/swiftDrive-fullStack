import React, { useState } from 'react';
import { assets, cityList } from '../assets/assets';
import { useForm } from "react-hook-form";
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB'; // for dd/MM/yyyy
registerLocale('en-GB', enGB);

const Hero = () => {
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const { navigate } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = (data) => {
    navigate(`/cars?pickupLocation=${data.pickupLocation}&pickupDate=${pickupDate?.toISOString().split('T')[0]}&returnDate=${returnDate?.toISOString().split('T')[0]}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='h-screen flex flex-col justify-center items-center gap-14 text-center'
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='text-4xl md:text-5xl font-semibold'
      >
        Luxury Cars on Rent
      </motion.h1>

      <motion.form
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col md:flex-row md:items-center items-start justify-between p-6 rounded-lg md:rounded-full shadow-xl max-w-80 md:max-w-200 gap-6'
      >
        <div className='flex flex-col md:flex-row md:items-center items-start gap-6 md:gap-10 w-full'>
          <div className='flex flex-col items-start gap-2'> <select {...register("pickupLocation", { required: "Please select a location" })}> <option value="">Pickup Location</option> { cityList.map((city)=>{ return <option key={city} value={city}>{city}</option> }) } </select> {errors.pickupLocation && ( <p className="text-sm text-red-500">{errors.pickupLocation.message}</p> )} <p className='px-1 text-sm text-gray-500'>Please select location</p> </div>

          {/* Pickup Date */}
          <div className='flex flex-col items-start gap-2 w-full md:w-auto'>
            <p>Pick-Up Date</p>
            <DatePicker
              selected={pickupDate}
              onChange={(date) => { setPickupDate(date); setValue('pickupDate', date); }}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className='px-2 py-2 border border-gray-300 rounded-md w-full'
              locale="en-GB"
            />
            {errors.pickupDate && <p className="text-sm text-red-500">{errors.pickupDate.message}</p>}
          </div>

          {/* Return Date */}
          <div className='flex flex-col items-start gap-2 w-full md:w-auto'>
            <p>Return Date</p>
            <DatePicker
              selected={returnDate}
              onChange={(date) => { setReturnDate(date); setValue('returnDate', date); }}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className='px-2 py-2 border border-gray-300 rounded-md w-full'
              locale="en-GB"
            />
            {errors.returnDate && <p className="text-sm text-red-500">{errors.returnDate.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className='flex justify-center items-center gap-1 text-white bg-primary hover:opacity-35 px-6 md:px-9 py-3 rounded-full cursor-pointer'
          >
            <img src={assets.search_icon} alt="" className='brightness-300' />
            Search
          </motion.button>
        </div>
      </motion.form>

      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car}
        alt="car"
        className='max-h-72 '
      />
    </motion.div>
  );
};

export default Hero;
