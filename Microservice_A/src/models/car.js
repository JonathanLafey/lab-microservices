const mongoose = require('mongoose');

/**
 * The schema of the cars
 */
module.exports = mongoose.model('Car', mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'cars' }));
