const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(200).send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
  //  => {
  //   if (err.name === 'DocumentNotFoundError') {
  //     res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
  //   } else if (err.name === 'CastError') {
  //     res.status(BAD_REQUEST).send({ message: 'Пользователь по указанному _id не найден.' });
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send(err.message);
  //   }
  // });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  if (!email || !req.body.password) { throw new BadRequestError({ message: 'Неверные данные.' }); }

  User.findOne({ email })
    .then((mail) => {
      if (mail) {
        throw new ConflictError({ message: 'Пользователь с таким email уже существует.' });
      }
    });

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

// Мы рекомендуем записывать JWT в httpOnly куку
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError({ message: 'Ошибка аутентификации.' });
      }
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      // вернём токен
      return res.send({ token });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(200).send(req.body);
    })
    .catch(next);
  // => {
  //   if (err.name === 'ValidationError') {
  //     res.status(BAD_REQUEST).send('Переданы некорректные данные при обновлении профиля.' });
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send(err.message);
  //   }
  // });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(200).send(req.body);
    })
    .catch(next);
  // => {
  //   if (err.name === 'ValidationError') {
  //     res.status(BAD_REQUEST).send({'Переданы некорректные данные при обновлении аватара.' });
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send(err.message);
  //   }
  // });
};
