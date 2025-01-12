const Booking = require('../models/Booking');
const User = require('../models/User');

// Create a new booking
exports.createBooking = async (req, res) => {
  const { customerId, developerId, startDate, endDate } = req.body;

  try {
    // Check if customer and developer exist
    const customer = await User.findByPk(customerId);
    const developer = await User.findByPk(developerId);

    if (!customer || !developer) {
      return res.status(404).json({ error: 'Customer or Developer not found' });
    }

    // Check that the developer has the correct role
    if (developer.roleId !== 1) { // Assuming '1' is the ID for the 'developer' role
      return res.status(400).json({ error: 'DeveloperId must belong to a developer role' });
    }

    // Create the booking
    const booking = await Booking.create({
      customerId,
      developerId,
      startDate,
      endDate,
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, as: 'customer', attributes: ['id', 'name'] },
        { model: User, as: 'developer', attributes: ['id', 'name', 'hourlyRate'] },
      ],
    });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBooking = async (req, res) => {
    const { id } = req.params;
  
    try {
      const booking = await Booking.findOne({
        where: { bookingId: id },
        include: [
          { model: User, as: 'customer', attributes: ['id', 'name'] },
          { model: User, as: 'developer', attributes: ['id', 'name', 'hourlyRate'] },
        ],
      });
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  