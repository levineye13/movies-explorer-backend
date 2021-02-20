const winston = require('winston');
const { logger, errorLogger } = require('express-winston');

module.exports.requestLogger = logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});

module.exports.errorLogger = errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});
