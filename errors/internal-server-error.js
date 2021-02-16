const {
  HTTP_MESSAGES: { internalServerError },
} = require('../utils/constants');

class InternalServerError extends Error {
  constructor() {
    super();
    this.message = internalServerError;
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
