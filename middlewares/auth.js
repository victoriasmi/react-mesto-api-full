const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const ForbiddenError = require('../errors/forbidden-err');

const JWT_SECRET = require('../config');

module.exports = (req, res, next) => {
  // тут будет вся авторизация
  // достаём авторизационный заголовок
  // const { authorization } = req.header;
  // убеждаемся, что он есть или начинается с Bearer
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  // if (!jwtCookies) {
  //   throw new ForbiddenError({ message: 'Такого пользователя не существует.' });
  // }
  // извлечём токен
  // const token = authorization.replace('Bearer ', '');
  // const { jwtCookies } = req.cookies.jwt;
  const token = req.cookies.jwt;
  if (!token) {
    throw new ForbiddenError({ message: 'Необходима авторизация.' });
  }
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError({ message: 'Такого пользователя не существует.' }));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};