/* eslint-disable global-require */
import pino from 'pino';
import SentryLogger from '../src/services/sentry';

beforeEach(() => {
  jest.resetModules();
});

afterAll(() => {
  // after finishing reset NODE_ENV to testing to prevent errors on subsequent tests
  process.env.NODE_ENV = 'testing';
});

describe('Check logger instance on different environments', () => {
  it('with env production logger should be Sentry', done => {
    process.env.NODE_ENV = 'production';
    process.env.USE_SENTRY = true;
    process.env.SENTRY_DSN = 'https://66f3205d81094ddf9906a24851fed641@sentry.io/1793833';
    const Logger = require('../src/services/logger').default;
    expect(Logger.logger.constructor.name).toBeTruthy();
    expect(Logger.logger.constructor.name).toEqual(SentryLogger.constructor.name);
    done();
  });
  it('with env development logger should be pino', done => {
    process.env.NODE_ENV = 'development';
    const Pino = pino();
    const Logger = require('../src/services/logger').default;
    expect(Logger.logger.constructor.name).toBeTruthy();
    expect(Logger.logger.constructor.name).toEqual(Pino.constructor.name);
    done();
  });
});

describe('Check logger functions on different environments', () => {
  it('testing logger methods with env production', done => {
    process.env.NODE_ENV = 'production';
    process.env.USE_SENTRY = true;
    process.env.SENTRY_DSN = 'https://66f3205d81094ddf9906a24851fed641@sentry.io/1793833';
    const Logger = require('../src/services/logger').default;
    const LoggerInstance = Logger.getLogger();
    LoggerInstance.info = jest.fn();
    Logger.info('foo');
    LoggerInstance.warn = jest.fn();
    Logger.warn('foo');
    LoggerInstance.error = jest.fn();
    Logger.error('foo');
    expect(LoggerInstance.info).toHaveBeenCalledTimes(1);
    expect(LoggerInstance.warn).toHaveBeenCalledTimes(1);
    expect(LoggerInstance.error).toHaveBeenCalledTimes(1);
    done();
  });
  it('testing logger methods with env development', done => {
    process.env.NODE_ENV = 'development';
    const Logger = require('../src/services/logger').default;
    const LoggerInstance = Logger.getLogger();
    LoggerInstance.info = jest.fn();
    Logger.info('foo');
    LoggerInstance.warn = jest.fn();
    Logger.warn('foo');
    LoggerInstance.error = jest.fn();
    Logger.error('foo');
    expect(LoggerInstance.info).toHaveBeenCalledTimes(1);
    expect(LoggerInstance.warn).toHaveBeenCalledTimes(1);
    expect(LoggerInstance.error).toHaveBeenCalledTimes(1);
    done();
  });
});
