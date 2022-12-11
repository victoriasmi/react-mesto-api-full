module.exports = ((err, req, res) => {
  res.status(err.statusCode).send({ message: err.message });
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(401).send({ message: 'Необходима авторизация' });
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});
