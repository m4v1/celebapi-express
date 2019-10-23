import * as Sentry from '@sentry/node';

class SentryLogger {
  constructor() {
    // set default logger for prod
    Sentry.init({
      dsn: 'https://66f3205d81094ddf9906a24851fed641@sentry.io/1793833'
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

export default new SentryLogger();
