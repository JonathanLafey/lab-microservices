const { Types } = require('mongoose');
const Driver = require('../models/driver');
const messages = require('../config/messages');

/**
 * Endpoint to all drivers' info
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Array}
 */
exports.listDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find().lean();
    if (drivers) return res.json({ data: drivers });
    return res.status(404).json({ error: messages.errors.notFound('Drivers') });
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
exports.getDriver = async (req, res, next) => {
  try {
    if (Types.ObjectId.isValid(req.params.id)) {
      const driver = await Driver.findById(req.params.id).lean();
      if (driver) return res.json({ data: driver });
      return res.status(404).json({ error: messages.errors.notFound('Driver') });
    }
    return res.status(400).json({ error: messages.errors.wrongIdFormat });
  } catch (error) {
    return next(error);
  }
};

/**
 * Endpoint to create a driver
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object}
 */
exports.createDriver = async (req, res, next) => {
  try {
    const savedDriver = await Driver.create(req.body);
    return res.json({ data: savedDriver });
  } catch (error) {
    return next(error);
  }
};

/**
 * Endpoint to update a driver
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object}
 */
exports.updateDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id,
      {
        $set: {
          name: req.body.name,
        },
      }, {
        new: true, runValidators: true,
      });
    if (driver) {
      return res.json({ data: driver });
    }
    return res.status(404).json({ error: messages.errors.notFound('Driver') });
  } catch (error) {
    return next(error);
  }
};

/**
 * Endpoint to delete a driver
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object}
 */
exports.deleteDriver = async (req, res, next) => {
  try {
    if (Types.ObjectId.isValid(req.params.id)) {
      await Driver.remove({ _id: req.params.id });
      return res.status(204).json({ data: messages.successful.deletedSuccessfully(`Driver ${req.params.id}`) });
    }
    return res.status(400).json({ error: messages.errors.wrongIdFormat });
  } catch (error) {
    return next(error);
  }
};
