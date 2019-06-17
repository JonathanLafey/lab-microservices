const mongoose = require('mongoose');

/**
 * The penalties model
 */
module.exports = mongoose.model('Penalty', mongoose.Schema({
  driver_id: {
    type: String,
    required: true,
  },
  car_id: {
    type: String,
    required: true,
  },
  penalty: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'penalties' }));
