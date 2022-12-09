const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateAvatar, updateProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.get('/users/me', getCurrentUser);
// router.post('/users', createUser);
router.patch('/users/me/avatar', updateAvatar);
router.patch('/users/me', updateProfile);

module.exports = router;
