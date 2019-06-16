const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../services/logger');

/**
 * Closes the connection to the database and exits the process completely
 */
const closeConnection = () => {
  mongoose.connection.close(() => {
    logger.warn(`Disconnecting from MongoDB ${config.db.server}`);
    process.exit(0);
  });
};

module.exports = () => {
  const connection = mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.server}/${config.db.db}`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      auto_reconnect: true,
    });
  mongoose.connection.on('error', (err) => {
    logger.error(`Error while connecting to ${config.db.server}`, err);
  });
  mongoose.connection.on('close', () => {
    logger.warn(`Connection closed to ${config.db.server}`);
  });
  mongoose.connection.on('connected', () => {
    logger.info(`Connected to ${config.db.server}`);
  });
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', closeConnection).on('SIGTERM', closeConnection);
  return connection;
};
