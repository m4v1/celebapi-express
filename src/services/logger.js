import pino from 'pino';
import SentryLogger from './sentry';

class Logger {
  constructor() {
    // set default logger for dev
    this.logger = pino();
    if (process.env.NODE_ENV === 'production') {
      this.logger = new SentryLogger();
    }
  }

  info = error => {
    this.logger.info(error);
  };

  warning = error => {
    this.logger.warn(error);
  };

  error = error => {
    this.logger.error(error);
  };
}

export default new Logger();
