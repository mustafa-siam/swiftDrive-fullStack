import express from "express"
import { changeBookingStatus, checkAvailabilityCar, creatBooking, getOwnerBookings, getUserBookings } from "../controllers/BookingController.js"
import { protect } from "../middleware/auth.js"
const bookingRouter=express.Router()
bookingRouter.post('/check-availability',checkAvailabilityCar)
bookingRouter.post('/create',protect,creatBooking)
bookingRouter.get('/user',protect,getUserBookings)
bookingRouter.get('/owner',protect,getOwnerBookings)
bookingRouter.post('/change-status',protect,changeBookingStatus)
export default bookingRouter;