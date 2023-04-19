const Card = require('../models/card');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCard = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    // { new: true }
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect input data.'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Card with this _id not found.');
    })
    .then((data) => {
      if (data.owner.valueOf() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId, { new: true })
          .then((card) => {
            res.status(200).send({ data: card });
          });
      } else {
        next(new ForbiddenError('No authorization for this action.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data.'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Card with this _id not found.');
    })
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Card with this _id not found.'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError('Card with this _id not found.'));
    })
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Card with this _id not found.'));
      } else {
        next(err);
      }
    });
};
