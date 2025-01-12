const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {
  const { name, password, publicKey, roleName, hourlyRate } = req.body;
  try {
    // Find the role by name
    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Create the user with the associated role
    const user = await User.create({
      name,
      password,
      publicKey,
      roleId: role.id,
      hourlyRate
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDevusers = async (req, res) => {
  try {
    const users = await User.findAll({where: {roleId: 1}});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { publicKey, balance } = req.body;
  try {
    const user = await User.update(
      { publicKey, balance },
      { where: { id } }
    );
    res.json({ message: 'User updated', affectedRows: user[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.destroy({ where: { id } });
    res.json({ message: 'User deleted', affectedRows: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signInUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    // Find the user by name
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    delete user.password;

    res.status(200).json({ message: 'Sign in successful', user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
