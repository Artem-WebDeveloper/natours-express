const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//! 1. GLOBAL MIDDLEWARES
// Установка безопасности HTTP Headers
app.use(helmet());

// Логи в режиме разработки
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Ограничение количество запросов от одного IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body парсер, читающий данные из body в body.req
app.use(express.json({ limit: '10kb' }));

// Sanitization данных против NoSQL query injection
// express-mongo-sanitize:
// deprecated/outdated; также несовместим с Express 5 req.query
// app.use(mongoSanitize());

// xss-clean:
// package deprecated/unmaintained
// app.use(xss());

// Предотвратить загрязнение запросов
// package deprecated/unmaintained
// app.use(hpp({ whitelist: ['duration', 'ratingsQuanity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'] }));

// Обслуживание статических файлов
app.use(express.static(`${__dirname}/public`));

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.set('query parser', 'extended');

//! 2. ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('/*splat', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Обработка ошибок
app.use(globalErrorHandler);

module.exports = app;
