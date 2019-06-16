const mongoose = require('mongoose');

/**
 * The one to many schema that holds the historical data of all the drivers of a car
 */
const DriversSchema = mongoose.Schema({
  // which driver is the active one
  active: {
    type: Boolean,
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  assignment_date: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

/**
 * The schema of the cars
 */
module.exports = mongoose.model('Car', mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  drivers: [DriversSchema],
  registration_date: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'cars' }));
