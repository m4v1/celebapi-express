import pino from 'pino';
import SentryLogger from './sentry';

class Logger {
  constructor() {
    // set default logger for dev
    this.logger = pino();
    if (process.env.NODE_ENV === 'production' && process.env.USE_SENTRY) {
      this.logger = SentryLogger;
    }
  }

  getLogger() {
    return this.logger;
  }

  info = error => {
    this.logger.info(error);
  };

  warn = error => {
    this.logger.warn(error);
  };

  error = error => {
    this.logger.error(error);
  };
}

export default new Logger();
