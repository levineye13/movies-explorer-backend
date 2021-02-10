const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { SERVER_PORT, DB_IP, DB_PORT, DB_NAME } = require('./config');
const { DB_OPTIONS } = require('./utils/constants');
const { returnMongoURI } = require('./utils/utils');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

mongoose.connect(
  returnMongoURI({ ip: DB_IP, port: DB_PORT, name: DB_NAME }),
  DB_OPTIONS
);

app.use(cors());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

app.listen(SERVER_PORT);
