const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    role.name = name;
    await role.save();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    await role.destroy();
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
