import React from 'react';
import { FaCar, FaDollarSign, FaGasPump, FaLocationArrow } from 'react-icons/fa';
import { MdOutlinePeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CarData = ({car}) => {
    const navigate=useNavigate()
    return (
        <div onClick={()=>navigate(`/car-details/${car._id}`)} className="card bg-base-100 shadow-sm hover:-translate-y-2 transition-all duration-500 cursor-pointer">
  <figure className='relative'>
    <img
      src={car.image}
      className='w-full h-64 '
      alt="Shoes" />
      {
        car.isAvaliable && <p className='absolute top-4 left-4 bg-primary/90 text-white py-1 px-2.5 rounded-full'>Available Now </p>
      }
      <h1 className='absolute flex items-center bg-black p-2 text-white rounded-full bottom-4 right-4'><FaDollarSign/>{car.pricePerDay}/day</h1>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{car.brand} {car.model}</h2>
    <p>{car.category} {car.year}</p>
    <div className="card-action flex justify-between text-[#4A5565] text-balance gap-6">
        <div>
 <div className='flex items-center gap-1 pb-2'>
        <MdOutlinePeople></MdOutlinePeople>
        {car.seating_capacity} seat
      </div>
      <div className='flex items-center gap-1 pb-2'>
        <FaCar></FaCar>
        {
            car.transmission
        }
      </div>
        </div>
     <div>
<div className='flex items-center gap-1 pb-2'>
        <FaGasPump></FaGasPump>
        {
            car.fuel_type
        }
      </div>
      <div className='flex items-center gap-1 pb-2'>
        <FaLocationArrow></FaLocationArrow>
        {
            car.location
        }
      </div>
     </div>   
    </div>
  </div>
</div>
    );
};

export default CarData;