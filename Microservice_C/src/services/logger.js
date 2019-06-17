const winston = require('winston');

/**
 * Create a new winston logger and set the available transports
 * Log format example: "2019-06-16T16:04:18.946Z | INFO | Service started"
 * https://github.com/winstonjs/winston
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} | ${info.level} | ${info.message}`),
  ),
  level: 'debug',
  transports: [
    new winston.transports.Console({ handleExceptions: true }),
  ],
});

process.on('unhandledRejection', (err) => {
  throw err;
});

module.exports = logger;
