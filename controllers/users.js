const User = require('../models/user');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    // .orFail(() => {
    //   throw new Error({ message: 'Некорректный запрос.' });
    // })
    .then((users) => {
      res.send({ data: users });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный запрос.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    // .orFail(() => {
    //   throw new Error({ message: 'Передан некорректный id пользователя.' });
    // })
    // вернём записанные в базу данные
    .then((user) => {
      res.send({ data: user });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный запрос.' });
      } else if (err.statusCode === 404) {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    // .orFail(() => {
    //   throw new Error({ message: 'Переданы некорректные данные при создании пользователя.' });
    // })
    // вернём записанные в базу данные
    .then((user) => {
      res.send({ data: user });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.statusCode === 400) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя. ' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    // .orFail(() => {
    //   throw new Error({ message: 'Передан некорректный id пользователя.' });
    // })
    // вернём записанные в базу данные
    .then(() => {
      res.status(200).send(req.body);
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.statusCode === 404) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, avatar, { runValidators: true })
    // .orFail(() => {
    //   throw new Error({ message: 'Передан некорректный id пользователя.' });
    // })
    // вернём записанные в базу данные
    .then(() => {
      res.status(200).send(req.body);
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else if (err.statusCode === 404) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      }
    });
};
