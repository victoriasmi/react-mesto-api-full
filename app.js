const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require('path');
const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '637bce920fc9e8dcf77ea48b', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  // console.log(`app listening to port ${PORT}`);
});

// const process = require('process');

// process.on('uncaughtException', (err, origin) => {
//   console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана.`);
// });

// // Выбросим синхронную ошибку
// throw new Error(`Ошибка, которую мы пропустили`);
