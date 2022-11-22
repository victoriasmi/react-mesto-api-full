const Card = require('../models/card');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getCard = (req, res) => {
  Card.find({})
    // .orFail(() => {
    //   throw new Error({ message: 'Некорректный запрос.' });
    // })
    // вернём записанные в базу данные
    .then((card) => {
      res.send({ data: card });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.statusCode === 400) {
        res.status(BAD_REQUEST).send({ message: 'Некорректный запрос.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.statusCode === 400) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)

    // вернём записанные в базу данные
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный запрос.' });
      } else if (err.statusCode === 404) {
        res.status(BAD_REQUEST).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    // .orFail(() => {
    //   throw new Error({ message: 'Некорректный запрос.' });
    // })
    .then((card) => {
      res.send({ data: card });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      } else if (err.name === 'ValidationError') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    // .orFail(() => {
    //   throw new Error({ message: 'Некорректный запрос.' });
    // })
    .then((card) => {
      res.send({ data: card });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      } else if (err.name === 'ValidationError') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};
