const { InternalServerError } = require('../errors');

module.exports = (err, req, res, next) => {
  const serverError = new InternalServerError();
  const {
    errorCode = serverError.statusCode,
    message = serverError.message,
  } = err;

  res.status(errorCode).send({ message });
  next();
};
