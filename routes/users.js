const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getUsers, getUserById, updateAvatar, updateProfile, getCurrentUser,
} = require('../controllers/users');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  } throw new Error('Некорректная ссылка.');
};

router.get('/users/me', getCurrentUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      link: Joi.string().required().custom(method),
    }),
  }),
  updateAvatar,
);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);

module.exports = router;
