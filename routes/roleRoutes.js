const express = require('express');
const {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');

const router = express.Router();

// Create Role
router.post('/', createRole);

// Get All Roles
router.get('/', getRoles);

// Update Role
router.put('/:id', updateRole);

// Delete Role
router.delete('/:id', deleteRole);

module.exports = router;
