const { verify } = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const { UnauthorizedError } = require('../errors');
const {
  HTTP_MESSAGES: { unauthorized },
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt || !jwt.startsWith('Bearer ')) {
    return next(new UnauthorizedError(unauthorized));
  }

  const token = jwt.replace('Bearer ', '');
  let payload;

  try {
    payload = verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(unauthorized));
  }

  req.user = payload;
  return next();
};
