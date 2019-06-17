const express = require('express');
const config = require('./config/config');
const logger = require('./services/logger');
const newCarConsumer = require('./consumers/newCarConsumer');
const deleteCarConsumer = require('./consumers/deleteCarConsumer');

// initialize the express application
const app = express();

// start the consumer for newly registrered cars
newCarConsumer();
// start the consumer for deleted cars
deleteCarConsumer();

// start the server
app.server = app.listen(config.server.port, (err) => {
  if (err) {
    // on general error, log it
    logger.error(err);
  }
  logger.info(`Server started successfully, running on port: ${config.server.port}.`);
});

module.exports = app;
