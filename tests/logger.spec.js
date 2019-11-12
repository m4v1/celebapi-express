/* eslint-disable global-require */
import pino from 'pino';
import { Config } from '../src/config';

beforeEach(() => {
  jest.resetModules();
});

afterAll(() => {
  // after finishing reset NODE_ENV to testing to prevent errors on subsequent tests
  process.env.NODE_ENV = 'testing';
  Config.load();
});

describe('Check logger instance on different environments', () => {
  it('with env development logger should be pino', done => {
    process.env.NODE_ENV = 'development';
    Config.load();
    const Logger = require('../src/services/logger').default;
    const Pino = pino();
    const serializedPino = JSON.stringify(Pino);
    const serializedLogger = JSON.stringify(Logger.logger);
    expect(serializedPino).toEqual(serializedLogger);
    done();
  });
  it('with env testing logger should be pino', done => {
    process.env.NODE_ENV = 'testing';
    Config.load();
    const Logger = require('../src/services/logger').default;
    const Pino = pino();
    const serializedPino = JSON.stringify(Pino);
    const serializedLogger = JSON.stringify(Logger.logger);
    expect(serializedPino).toEqual(serializedLogger);
    done();
  });
  it('with env production logger should be Sentry', done => {
    process.env.NODE_ENV = 'production';
    Config.load();
    const Logger = require('../src/services/logger').default;
    const SentryLogger = require('../src/services/sentry').default;
    const Sentry = new SentryLogger();
    const serializedSentry = JSON.stringify(Sentry);
    const serializedLogger = JSON.stringify(Logger.logger);
    expect(serializedSentry).toEqual(serializedLogger);
    done();
  });
});
