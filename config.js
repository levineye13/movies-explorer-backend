require('dotenv').config();

const {
  NODE_ENV = 'development',
  JWT_SECRET = 'JWT_SECRET_KEY',
  SERVER_PORT = 3000,
  DB_IP = '127.0.0.1',
  DB_PORT = '27017',
  DB_NAME = 'moviesExplorer',
} = process.env;

module.exports = { NODE_ENV, JWT_SECRET, SERVER_PORT, DB_IP, DB_PORT, DB_NAME };
