import React, { useEffect, useState } from 'react';
import TitleOwner from '../../components/owner/TitleOwner';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import moment from 'moment';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { axios, isOwner } = useAppContext();

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) fetchBookings();
  }, [isOwner]);

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', {
        bookingId,
        status: status.toLowerCase(), // match backend enum
      });
      if (data.success) {
        toast.success(data.message);
        fetchBookings(); // refresh table after status change
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='p-6 space-y-12'>
      <TitleOwner
        title={"Manage Bookings"}
        subtitle={"Track all customer bookings, approve or cancel requests, and manage booking statuses"}
      />
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table border-2">
          <thead>
            <tr className='border-b-2'>
              <th>Car</th>
              <th className='max-md:hidden'>Date Range</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>
                  <div className="tooltip" data-tip={`${booking.car.brand} ${booking.car.model}`}>
                    <img src={booking.car.image} alt="car" className='w-12 h-12' />
                  </div>
                </td>
                <td className='max-md:hidden'>
                  <p>{moment(booking.pickupDate).format("DD-MM-YYYY")} To {moment(booking.returnDate).format("DD-MM-YYYY")}</p>
                </td>
                <td>${booking.price}</td>
                <td className='text-xs text-[#929394]'>offline</td>
                <td>
                  {booking.status === "pending" ? (
                    <select
                      onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
                      value={booking.status}
                      className="px-2 py-1.5 mt-1 text-gray-500 rounded-md outline-none border border-[#DDE1EE]"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? 'bg-green-100 text-green-500'
                        : 'bg-red-100 text-red-500'
                    }`}>
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
