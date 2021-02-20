const { InternalServerError } = require('../errors');

module.exports = (err, req, res, next) => {
  const serverError = new InternalServerError();
  const {
    statusCode = serverError.statusCode,
    message = serverError.message,
  } = err;

  res.status(statusCode).send({ message });
  next();
};
