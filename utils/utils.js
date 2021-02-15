const { BadRequestError } = require('../errors');

module.exports.returnMongoURI = ({ ip, port, name }) =>
  `mongodb://${ip}:${port}/${name}`;

module.exports.checkMongoError = (err) => {
  return ['ValidationError', 'CastError'].includes(err.name)
    ? new BadRequestError('Переданы некорректные данные')
    : err;
};
