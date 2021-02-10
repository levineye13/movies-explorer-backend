const { verify } = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const { UnauthorizedError } = require('../errors');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt || !jwt.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = jwt.replace('Bearer ', '');
  let payload;

  try {
    payload = verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
