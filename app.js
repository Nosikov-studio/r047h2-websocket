const express = require("express");
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
// const morgan = require('morgan') // *зависимость устанавливается при начальной установке сервера
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const app = express();
// Начиная с версии Express 4.16.0, пакет body-parser официально считается устаревшим 
// (deprecated), поскольку его функциональность была интегрирована непосредственно 
// в сам Express. Это означает, что теперь для разбора тела HTTP-запросов 
// (например, JSON или URL-кодированных данных) не нужно устанавливать и использовать 
// отдельный модуль body-parser — вместо этого можно использовать встроенные 
// методы Express: express.json() и express.urlencoded()
 app.use('/uploads', express.static('uploads'))
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 app.use(cors());
// app.use(morgan()); // *зависимость устанавливается при начальной установке сервера

mongoose.connect(keys.mongoURI)
    .then(()=>console.log("Подключение установлено"))
    .catch(error => console.log(error));
   
app.use(passport.initialize())
require('./middleware/passport')(passport)   

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports=app;