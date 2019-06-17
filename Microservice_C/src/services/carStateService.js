const logger = require('./logger');
const Penalty = require('../models/penalty');

/**
 * Computes the penalty points recursively
 * @param {Number} remaining The remaining km/h to be charged
 * @param {Number} total The accumulated penalty points
 * @param {Number} threshold The speed threshold that the charge changes (it's static, every 20 km/h)
 * @param {Number} charge The charge per km/h
 * @returns {Number} The total penalty points
 */
function computePoints(remaining, total = 0, threshold = 20, charge = 1) {
  let newTotal = total;
  // if the speed is within the current charge window (+20 km/h) then apply the charge and return the points
  if (remaining <= threshold) newTotal += remaining * charge;
  else {
    // otherwise charge full points for the current window
    newTotal += threshold * charge;
    // compute the charge for the next window
    let newCharge;
    if (charge === 1) newCharge = 2;
    else newCharge = 5;
    // recursively call the same function with the remainder speed, the current point sum and the next window charge
    newTotal = computePoints((remaining - threshold), newTotal, threshold, newCharge);
  }
  // return the accumulated points
  return newTotal;
}

/**
 * Parses the state of a car and assigns penalties to drivers if the were driving on an illegal state
 * 1 Penalty point is added for every Km over 60Km/h, 2 points for over 80Km/h, 5 points for over 100Km/h
 * @param {Number} state
 */
async function processState(state) {
  // only apply penalty if the speed exceeds the lower limit
  if (state.speed > 60) {
    // pass the km/h that start to be charged and compute the total points
    const totalPoints = computePoints(state.speed - 60);
    await Penalty.create({
      driver_id: state.driver_id,
      car_id: state.car_id,
      penalty: totalPoints,
      speed: state.speed,
    });
    logger.debug(`Added ${totalPoints} penalty points to driver ${state.driver_id}`);
  }
}

module.exports = {
  processState,
};
