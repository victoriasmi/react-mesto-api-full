module.exports = ((err, req, res, next) => {
  // res.status(err.statusCode).send({ message: err.message });
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'Server error'
        : message,
    });

  next();
});
