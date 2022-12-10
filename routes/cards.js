const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  } throw new Error('Некорректная ссылка.');
};

router.get('/cards', getCard);
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(method),
      owner: Joi.string().required(),
    }),
  }),
  createCard,
);
router.delete(
  '/cards/:cardId',
  celebrate({
    body: Joi.object().keys({
      // ObjectId: Joi.string().required().hex(),
    }),
  }),
  deleteCard,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    body: Joi.object().keys({
      owner: Joi.string().required().hex(),
    }),
  }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    body: Joi.object().keys({
      owner: Joi.string().required().hex(),
    }),
  }),
  dislikeCard,
);

module.exports = router;
