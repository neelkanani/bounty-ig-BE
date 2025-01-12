const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Booking = sequelize.define('Booking', {
  bookingId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  developerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Associations
User.hasMany(Booking, { foreignKey: 'customerId', as: 'customerBookings' });
User.hasMany(Booking, { foreignKey: 'developerId', as: 'developerBookings' });
Booking.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
Booking.belongsTo(User, { foreignKey: 'developerId', as: 'developer' });

module.exports = Booking;
