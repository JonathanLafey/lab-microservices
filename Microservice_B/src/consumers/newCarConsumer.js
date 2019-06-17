const logger = require('../services/logger');
const { consume } = require('../services/rabbitMQWrapper');
const { startHeartbeat } = require('../services/heartbeat');

module.exports = () => {
  let channelWrapper;
  // Handle an incomming message.
  const onMessage = async (data) => {
    let message;
    try {
      // try parsing the message
      message = JSON.parse(data.content.toString());
    } catch (error) {
      // if anything's wrong with the format (invalid json, etc...) reply with not acknowledge, dead-letter the message and do nothing
      channelWrapper.nack(data, false, false);
      logger.error(error.message);
      logger.info('Not Acknowledged message, queue: \'car-started\'');
      return;
    }
    logger.info(`Received message: ${JSON.stringify(message)}, queue: 'car-started'`);

    // start heartbeats that simulate the movement of a car
    startHeartbeat(message.car_id, message.driver_id);

    channelWrapper.ack(data);
    logger.info(`Acknowledged message: ${JSON.stringify(message)}, queue: car-started`);
  };

  // initialize a consumer for the given queue that will call the provided callback
  channelWrapper = consume('car-started', onMessage);

  // return the channel
  return channelWrapper;
};
