const { Types } = require('mongoose');
const Car = require('../models/car');
const messages = require('../config/messages');

/**
 * Endpoint to all cars' info
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Array}
 */
exports.listCars = async (req, res, next) => {
  try {
    const cars = await Car.find().lean();
    if (cars) return res.json({ data: cars });
    return res.status(404).json({ error: messages.errors.notFound('Cars') });
  } catch (error) {
    return next(error);
  }
};

/**
 * Endpoint to get a car's info
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object}
 */
exports.getCar = async (req, res, next) => {
  try {
    if (Types.ObjectId.isValid(req.params.id)) {
      const car = await Car.findById(req.params.id).lean();
      if (car) return res.json({ data: car });
      return res.status(404).json({ error: messages.errors.notFound('Car') });
    }
    return res.status(400).json({ error: messages.errors.wrongIdFormat });
  } catch (error) {
    return next(error);
  }
};

/**
 * Endpoint to create a car
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object}
 */
exports.createCar = async (req, res, next) => {
  try {
    const savedCar = await Car.create(req.body);
    return res.json({ data: savedCar });
  } catch (error) {
    return next(error);
  }
};

/**
 * Endpoint to update a car
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object}
 */
exports.updateCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id,
      {
        $set: {
          brand: req.body.brand,
          // drivers and dates are not updatedble. Car drivers will be updated by separate endpoint
        },
      }, {
        new: true, runValidators: true,
      });
    if (car) {
      return res.json({ data: car });
    }
    return res.status(404).json({ error: messages.errors.notFound('Car') });
  } catch (error) {
    return next(error);
  }
};

/**
 * Endpoint to delete a car
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object}
 */
exports.deleteCar = async (req, res, next) => {
  try {
    if (Types.ObjectId.isValid(req.params.id)) {
      await Car.remove({ _id: req.params.id });
      return res.status(204).json({ data: messages.successful.deletedSuccessfully(`Car ${req.params.id}`) });
    }
    return res.status(400).json({ error: messages.errors.wrongIdFormat });
  } catch (error) {
    return next(error);
  }
};
