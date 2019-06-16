// https://github.com/benbria/node-amqp-connection-manager
const amqp = require('amqp-connection-manager');
const config = require('./config');
const logger = require('../services/logger');

/**
 * Creates a connection to rabbitmq server
 */
function connect() {
  // open the connection to the rabbitmq server
  const connection = amqp.connect(config.rabbitmq.url, { json: true });
  connection.on('connect', () => {
    logger.info(`Connection to ${config.rabbitmq.url} established`);
  });
  connection.on('disconnect', (params) => {
    logger.error(`Disconnected from ${config.rabbitmq.url}. ${params.err.stack}`);
  });
  return connection;
}

module.exports = connect;
