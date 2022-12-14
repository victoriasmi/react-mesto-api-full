const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
// const NotFoundError = require('../errors/not-found-err');

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
      avatar: Joi.string().required().custom(method),
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

// router.use((req, res, next) => {
//   next(new NotFoundError('Страница не найдена.'));
// });

module.exports = router;
