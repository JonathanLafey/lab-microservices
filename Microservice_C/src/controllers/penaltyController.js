const { Types } = require('mongoose');
const Penalty = require('../models/penalty');
const messages = require('../config/messages');

/**
 * Endpoint to all drivers' info
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Array}
 */
exports.index = async (req, res, next) => {
  try {
    const penalties = await Penalty.find().lean();
    if (penalties) return res.json({ data: penalties });
    return res.status(404).json({ error: messages.errors.notFound('Penalties') });
  } catch (error) {
    return next(error);
  }
};

/**
 * Endpoint to get a driver's info
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object}
 */
// exports.getDriver = async (req, res, next) => {
//   try {
//     if (Types.ObjectId.isValid(req.params.id)) {
//       const driver = await Driver.findById(req.params.id).lean();
//       if (driver) return res.json({ data: driver });
//       return res.status(404).json({ error: messages.errors.notFound('Driver') });
//     }
//     return res.status(400).json({ error: messages.errors.wrongIdFormat });
//   } catch (error) {
//     return next(error);
//   }
// };
