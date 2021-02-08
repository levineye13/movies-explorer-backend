require('dotenv').config();

const {
  NODE_ENV = 'development',
  JWT_SECRET = 'JWT_SECRET_KEY',
  SERVER_PORT = 3000,
} = process.env;

module.exports = { NODE_ENV, JWT_SECRET, SERVER_PORT };
