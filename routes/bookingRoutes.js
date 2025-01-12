const express = require('express');
const { createBooking, getBookings, getBooking } = require('../controllers/bookingController');

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get all bookings
router.get('/', getBookings);

router.get('/:id', getBooking);

module.exports = router;
