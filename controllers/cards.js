const Card = require('../models/card');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getCard = (req, res) => {
  Card.find({})
    .orFail.catch((err) => {
      if (err.statusCode === NOT_FOUND || BAD_REQUEST) {
        throw new Error('Некорректный запрос.');
      }
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send(err.message);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }, { runValidators: true })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err.message);
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail.catch((err) => {
      if (err.statusCode === NOT_FOUND) {
        throw new Error('Карточка с указанным _id не найдена.');
      }
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный запрос.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err.message);
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail.catch((err) => {
      if (err.statusCode === NOT_FOUND) {
        throw new Error('Карточка с указанным _id не найдена.');
      }
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err.message);
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail.catch((err) => {
      if (err.statusCode === NOT_FOUND) {
        throw new Error('Карточка с указанным _id не найдена.');
      }
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err.message);
      }
    });
};
