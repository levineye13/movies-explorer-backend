const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  statusCode: 429,
  message: JSON.stringify({
    message: 'Вы превысили максимальное число запросов.',
  }),
  headers: true,
});
