const logger = require('../services/logger');
const connection = require('../config/rabbitMQ')();
const config = require('../config/config');

/**
 * Create a channel wrapper for producing
 * @param {String} queueName the name of the queue
 */
const createDurableChannel = queueName => connection.createChannel({
  json: true,
  setup: channel => channel.assertQueue(queueName, { durable: true }),
});

/**
 * Publishes the given message using the default direct exchange to the given queue.
 * If the queue does not exist, it will create it
 * @param {Object} message The message to be published
 * @returns {Promise} Promise that will return 'true', in case message published, or false on error
 */
const publish = (queue, message) => {
  const channel = createDurableChannel(queue, connection);
  return channel.sendToQueue(queue, message, { contentType: 'application/json', persistent: true })
    .then(() => {
      logger.debug(`Published on ${queue}: ${JSON.stringify(Object.assign({}, message))}`);
      channel.close();
      return true;
    }).catch((err) => {
      logger.debug(`Publish on ${queue} failed: ${err.toString()}`);
      channel.close();
      return false;
    });
};

/**
 * Create a channel wrapper listening for messages in the given queue
 * @param {String} queueName the name of the queue
 */
const createConsumerChannel = (queueName, callback) => connection.createChannel({
  json: true,
  setup: channel => Promise.all([
    channel.assertQueue(queueName, { durable: true }),
    channel.prefetch(1),
    channel.consume(queueName, callback),
  ]),
});

/**
 * Initialize a consumer for messages on the provided queue and providing it with a given callback
 * @param {String} queueName The name of the queue which to listen
 * @param {requestCallback} callback The callback for the consumer to call
 */
const consume = (queueName, callback) => {
  const channel = createConsumerChannel(queueName, callback, connection);
  // When channel will be connected, log it
  channel.waitForConnect()
    .then(() => {
      logger.info(`Listening messages on: ${queueName} at ${config.rabbitmq.url}`);
    });

  return channel;
};

module.exports = { publish, consume };
