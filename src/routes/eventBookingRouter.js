const express=require('express');
const { successEventBooking,eventBooking,failedEventBooking } = require("../controller/eventBookingController");

const router=express.Router();

router.post('/pay',eventBooking);
router.get('/success',successEventBooking);
router.get('/cancel',failedEventBooking);

module.exports=router;
