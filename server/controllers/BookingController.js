import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

const checkAvailability=async(car,pickupDate,returnDate)=>{
    const bookings=await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate},

    })
    return bookings.length===0;
}
export const checkAvailabilityCar=async(req,res)=>{
    try {
        const {location,pickupDate,returnDate}=req.body
        const cars=await Car.find({location,isAvaliable:true})
        const availableCarsPromises=cars.map(async(car)=>{
            const isAvaliable=await checkAvailability(car._id,pickupDate,returnDate)
            return {...car._doc,isAvaliable:isAvaliable}
        })
        let availvalecars=await Promise.all(availableCarsPromises);
        availvalecars=availvalecars.filter(car=>car.isAvaliable===true)
        res.json({success:true,availvalecars})
    } catch (error) {
         console.log(error.message);
    res.json({ success: false, message: error.message });
    }
}
//creat booking 
export const creatBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    // Check availability
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }

    const carData = await Car.findById(car);
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = noOfDays * carData.pricePerDay;
    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate: picked,
      returnDate: returned,
      price,
      location: carData.location,
    });

    res.json({ success: true, message: "Booking Created" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
//get user booking
export const getUserBookings=async(req,res)=>{
    try {
        const {_id}=req.user
        const bookings=await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
        res.json({success:true,bookings})
    } catch (error) {
         console.log(error.message);
    res.json({ success: false, message: error.message });
    }
}
//get owner bookings
export const getOwnerBookings=async(req,res)=>{
    try {
        if(req.user.role !== "owner"){
            return res.json({success:false,message:"unauthorized"})
        }
        const bookings=await Booking.find({owner:req.user._id}).populate("car user").select("-user.password").sort({createdAt:-1})
        res.json({success:true,bookings})
    } catch (error) {
         console.log(error.message);
    res.json({ success: false, message: error.message });
    }
}
//change booking status 
export const changeBookingStatus=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {bookingId,status}=req.body;
        const booking=await Booking.findById(bookingId)
        if(booking.owner.toString() !==_id.toString()){
            return res.json({success:false,message:"unauthorized"})
        }
        booking.status=status;
        await booking.save();
        res.json({success:true,message:"status updated"})
    } catch (error) {
        console.log(error.message);
    res.json({ success: false, message: error.message });
    }
}