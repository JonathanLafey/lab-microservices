const mongoose = require('mongoose');

/**
 * The drivers model
 */
module.exports = mongoose.model('Driver', mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'drivers' }));
