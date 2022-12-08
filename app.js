const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

// app.use((req, res, next) => {
//   req.user = {
//     _id: '637bce920fc9e8dcf77ea48b',
//   };

//   next();
// });

// const BAD_REQUEST = 401;
// const NOT_FOUND = 404;

app.post('/signin', login);
app.post('/signup', createUser);

// app.use((req, res) => {
//   res.status(401).send({ message: 'Необходима авторизация' });
// });

// app.use((req, res) => {
//   res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
// });

// авторизация
app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((err, req, res) => {
  res.status(err.statusCode).send({ message: err.message });
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}`);
});
