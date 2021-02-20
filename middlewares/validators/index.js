const {
  validateRegistration,
  validateAuthorization,
  validateUserUpdate,
} = require('./user');
const { validateCreateMovie } = require('./movie');
const { validateObjectId } = require('./general');

module.exports = {
  validateRegistration,
  validateAuthorization,
  validateUserUpdate,
  validateCreateMovie,
  validateObjectId,
};
