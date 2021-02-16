const rateLimit = require('express-rate-limit');
const {
  HTTP_MESSAGES: { tooManyRequests },
} = require('../utils/constants');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  statusCode: 429,
  message: JSON.stringify({
    message: tooManyRequests,
  }),
  headers: true,
});
