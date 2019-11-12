import * as Sentry from '@sentry/node';

class SentryLogger {
  constructor() {
    // set default logger for prod
    Sentry.init({
      dsn: process.env.SENTRY_DSN
    });
  }

  info = error => {
    Sentry.captureException(error);
  };

  warn = error => {
    Sentry.captureException(error);
  };

  error = error => {
    Sentry.captureException(error);
  };
}

export default SentryLogger;
