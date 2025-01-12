const express = require('express');
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  signInUser,
  getUser,
  getDevusers
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/dev-users', getDevusers);
router.post('/signin', signInUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
