import React, { useEffect, useState } from 'react';
import TitleOwner from '../../components/owner/TitleOwner';
import { assets, dummyDashboardData } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const {axios,isOwner}=useAppContext()
  const [data, setdata] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data?.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data?.totalBookings, icon: assets.listIconColored },
    { title: "Pending Bookings", value: data?.pendingBookings, icon: assets.cautionIconColored },
    { title: "Completed Bookings", value: data?.completedBookings, icon: assets.listIconColored },
  ];
 const fetchDashboardData=async()=>{
try {
  const {data}=await axios.get('/api/owner/dashboard')
  if(data.success){
    setdata(data.dashBoardData)
  }
  else{
    toast.error(data.message)
  }
} catch (error) {
  toast.error(error.message)
}
 }
  useEffect(() => {
    if(isOwner){
fetchDashboardData()
    }
  }, []);

  return (
    <div className='p-4 md:p-10 w-full'>
      <TitleOwner
        title={"Admin Dashboard"}
        subtitle={
          "Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        }
      />

      {/* Dashboard cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 my-8'>
        {dashboardCards.map((card, idx) => (
          <div
            key={idx}
            className='flex items-center justify-between gap-4 border border-[#DDE1EE] px-4 py-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all'
          >
            <div>
              <h1 className='text-[#6B7280] text-sm md:text-base'>{card.title}</h1>
              <p className='text-xl md:text-2xl font-medium'>{card.value}</p>
            </div>
            <div>
              <img src={card.icon} alt="" className='bg-primary/10 p-3 rounded-full w-10 h-10' />
            </div>
          </div>
        ))}
      </div>

      {/* Lower section */}
      <div className='flex flex-col lg:flex-row flex-wrap items-start gap-6 w-full'>
       {/* Recent Bookings */}
<div className='p-4 border border-[#DDE1EE] rounded-xl bg-white shadow-sm w-full lg:w-[65%]'>
  <h1 className='text-lg font-medium py-2'>Recent Bookings</h1>
  <p className='text-gray-500 text-sm'>Latest customer bookings</p>

  <div className='mt-6 overflow-x-auto'>
    <table className='min-w-[600px] w-full text-left border-collapse'>
      <thead>
        <tr className='border-b border-gray-200 text-gray-600 text-sm'>
          <th className='py-2 px-3'>Car</th>
          <th className='py-2 px-3'>Date</th>
          <th className='py-2 px-3'>Price</th>
          <th className='py-2 px-3 text-center'>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.recentBookings.length === 0 ? (
          <tr>
            <td colSpan={4} className='text-center py-6 text-gray-500'>
              No recent bookings found.
            </td>
          </tr>
        ) : (
          data?.recentBookings.map((booking, idx) => (
            <tr key={idx} className='border-b border-gray-100 hover:bg-gray-50'>
              <td className='flex items-center gap-3 py-3 px-3'>
                <img
                  src={assets.listIconColored}
                  alt=""
                  className='bg-primary/10 p-2 rounded-full w-8 h-8 flex-shrink-0'
                />
                <div>
                  <h1 className='font-medium text-sm'>
                    {booking.car.brand} {booking.car.model}
                  </h1>
                </div>
              </td>
              <td className='py-3 px-3 text-sm text-[#6A7282]'>
              {booking.car?.createdAt ? booking.car.createdAt.split('T')[0] : "N/A"}
              </td>
              <td className='py-3 px-3 text-sm text-[#64748B]'>
                ${booking.car.pricePerDay}
              </td>
              <td className='py-3 px-3 text-center'>
                <p className='px-3 py-1 rounded-full border border-[#DDE1EE] text-xs inline-block'>
                  {booking.status}
                </p>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
        <div className='p-4 border border-[#DDE1EE] rounded-xl bg-white shadow-sm w-full lg:w-[30%]'>
          <h1 className='text-lg font-medium py-2'>Monthly Revenue</h1>
          <p className='text-gray-500 text-sm'>Revenue for current month</p>
          <p className='text-[#2563EB] text-3xl font-semibold pt-6'>
            ${data?.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
