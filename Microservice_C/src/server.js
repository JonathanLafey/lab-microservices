const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const router = require('./services/router');
const logger = require('./services/logger');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/mongodb');
const carStateConsumer = require('./consumers/carStateConsumer');

// initialize the express application
const app = express();

app.use(express.json());
// https://github.com/expressjs/body-parser#extended
// app.use(express.urlencoded({ extended: true }));

// enable CORS for all domains/methods
// TODO: fine-grain CORS before releasing to production
app.use(cors());

// log every route called
app.use((req, res, next) => {
  logger.debug(`Incoming ${req.method} request to ${req.path}`);
  return next();
});

// assign the routes to express
app.use(router);

// import generic error handler https://expressjs.com/en/guide/using-middleware.html
app.use(errorHandler);

// initialize database connection (if the environment is not test)
if (process.env.NODE_ENV !== 'test') {
  db();
}

// start the consumer for active cars states
carStateConsumer();

// start the server
app.server = app.listen(config.server.port, (err) => {
  if (err) {
    // on general error, log it
    logger.error(err);
  }
  logger.info(`Server started successfully, running on port: ${config.server.port}.`);
});

module.exports = app;
