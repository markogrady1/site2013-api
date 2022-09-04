/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

const winston = require('winston');

const {
  combine,
} = winston.format;

const formatOpts = combine(
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const {
      timestamp,
      level,
      message,
      ...args
    } = info;

    const object = { time: timestamp, level, message };

    if (Object.keys(args).length) object.data = args;
    return JSON.stringify(object);
  }),
);

const log = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      level: process.env.APP_LOG_LEVEL || 'info',
      format: formatOpts,
    }),
  ],
});

// silence all logging when running tests
if (process.env.NODE_ENV === 'testenv') {
  log.transports.forEach((t) => (t.silent = true));
}

log.stream = {
  write: (message) => log.info(message),
};

module.exports = log;
