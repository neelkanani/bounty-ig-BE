const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
const Role = require('./Role');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicKey: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hourlyRate: {
    type: DataTypes.FLOAT,
    allowNull: true, // Nullable, only applicable for developers
    validate: {
      min: 0,
    },
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: true, // Nullable, only applicable for developers
    validate: {
      min: 0,
    },
  },

});

// Hash the password before saving
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Associate User with Role
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

module.exports = User;
