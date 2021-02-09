const express = require('express');
const mongoose = require('mongoose');

const { SERVER_PORT, DB_IP, DB_PORT, DB_NAME } = require('./config');

const app = express();

mongoose.connect(`mongodb://${DB_IP}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(SERVER_PORT);
