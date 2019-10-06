import pino from 'pino';

class Logger {
  constructor() {
    // set default logger
    this.logger = pino();
  }

  info = (msg) => {
    this.logger.info(msg);
  }

  warning = (msg) => {
    this.logger.info(msg);
  }

  error = (msg) => {
    this.logger.info(msg);
  }
}

export default new Logger();
