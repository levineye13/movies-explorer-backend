const { BadRequestError } = require('../errors');
const {
  HTTP_MESSAGES: { badRequest },
} = require('./constants');

module.exports.returnMongoURI = ({ ip, port, name }) =>
  `mongodb://${ip}:${port}/${name}`;

module.exports.checkMongoError = (err) => {
  return ['ValidationError', 'CastError'].includes(err.name)
    ? new BadRequestError(badRequest)
    : err;
};
