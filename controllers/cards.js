const Card = require('../models/card');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Переданы некорректные данные.');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  if (req.user._id === req.params.owner) {
    Card.findByIdAndRemove(req.params.cardId)
      .orFail()
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Карточка с указанным _id не найдена.');
        }
        res.status(200).send({ data: card });
      })
      .catch(next);
  } else { throw new ForbiddenError('У вас нет прав для осуществления этого действия.'); }
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};
