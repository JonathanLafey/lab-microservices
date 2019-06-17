const messages = require('../config/messages');
const logger = require('../services/logger');

/**
 * Generic error handler middleware
 * @param {Object} err The error parameter
 * @param {Object} req The request parameter
 * @param {Object} res The response parameter
 * @param {Object} next The middleware parameter
 * @returns The formatted response
 */
function errorHandler(err, req, res, next) {
  // prepare the error string
  let errorStr;
  if (err instanceof Object) {
    if (typeof err.toString === 'function') {
      errorStr = err.toString();
    } else { errorStr = JSON.stringify(err); }
  } else {
    errorStr = err;
  }
  logger.error(errorStr);

  // handle mongo errors as 400s
  if (err.name && err.name === 'MongoError') {
    return res.status(400).json({ error: errorStr });
  }

  // handle validation errors
  if (err.name && err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  // handle the rest of the errors as internal errors
  return res.status(500).json({ error: messages.errors.internalError });
}

module.exports = errorHandler;
