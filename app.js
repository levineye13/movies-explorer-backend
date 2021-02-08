const express = require('express');

const { SERVER_PORT } = require('./config');

const app = express();

app.listen(SERVER_PORT);
