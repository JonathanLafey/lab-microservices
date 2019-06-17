const { publish } = require('../services/rabbitMQWrapper');
const logger = require('./logger');

const intervalMap = new Map();

/**
 * Produce a message to mock the state of a car every 2 seconds
 * @param {Number} carId
 */
function startHeartbeat(carId, driverId) {
  // check if this car was already active, in which case stop all previous heartbeats
  const previousInterval = intervalMap.get({ car_id: carId });
  if (previousInterval) {
    logger.info(`Stopped heartbeats for car ${carId}`);
    clearInterval(previousInterval);
    intervalMap.delete({ car_id: carId });
  }
  // create a new interval
  const interval = setInterval(() => {
    publish('car-state', {
      car_id: carId,
      driver_id: driverId,
      // generate random coordinates
      geo_coordinates: {
        latitude: (Math.random() * 180 - 90).toFixed(4) * 1,
        longitude: (Math.random() * 360 - 180).toFixed(4) * 1,
      },
      // generate random speed from 10 to 120 km/h
      speed: Math.floor(Math.random() * (120 - 10 + 1)) + 10,
    });
  }, 2000);
  // add the recurrring producer on a map using as key both the car_id and the driver_id
  intervalMap.set({
    car_id: carId,
  }, interval);
  logger.info(`Started heartbeats for car ${carId} with driver ${driverId}`);
}

/**
 * Stop the generation of states for a certain car
 * @param {Number} carId
 */
function stopHeartbeat(carId) {
  // TODO: fix that as it's not working
  const interval = intervalMap.get({
    car_id: carId,
  });
  if (interval) {
    logger.info(`Stopped heartbeats for car ${carId}`);
    clearInterval(interval);
  }
}

module.exports = {
  startHeartbeat,
  stopHeartbeat,
};
