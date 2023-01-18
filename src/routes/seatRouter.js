const express=require('express');
const { successBooking,seatBooking,failedBooking } = require("../controller/seatBookingController");

const router=express.Router();

router.post('/pay',seatBooking);
router.get('/success',successBooking);
router.get('/cancel',failedBooking);

module.exports=router;
