import * as Sentry from '@sentry/node';

class SentryLogger {
  constructor() {
    // set default logger for prod
    Sentry.init({
      dsn: process.env.SENTRY_DSN
    });
    this.sentry = Sentry;
  }

  getSentry() {
    return this.sentry;
  }

  info = error => {
    this.sentry.captureException(error);
  };

  warn = error => {
    this.sentry.captureException(error);
  };

  error = error => {
    this.sentry.captureException(error);
  };
}

export default new SentryLogger();
