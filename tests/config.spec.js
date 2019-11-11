import { Config } from '../src/config';

afterAll(() => {
  // after finishing reset NODE_ENV to testing to prevent errors on subsequent tests
  process.env.NODE_ENV = 'testing';
});

describe('Get correct config for the various environments', () => {
  it('should set config for development env', done => {
    process.env.NODE_ENV = 'development';
    Config.load();
    // checking if values are set
    expect(process.env.SERVER_PORT).toEqual(expect.any(String));
    expect(process.env.DB_HOST).toEqual(expect.any(String));
    expect(process.env.DB_USER).toEqual(expect.any(String));
    expect(process.env.DB_PASS).toEqual(expect.any(String));
    expect(process.env.DB_NAME).toEqual(expect.any(String));
    // not testing other values because they can be null
    done();
  });
  it('should set config for testing env', done => {
    process.env.NODE_ENV = 'testing';
    Config.load();
    // checking if values are set
    expect(process.env.SERVER_PORT).toEqual(expect.any(String));
    expect(process.env.DB_HOST).toEqual(expect.any(String));
    expect(process.env.DB_USER).toEqual(expect.any(String));
    expect(process.env.DB_PASS).toEqual(expect.any(String));
    expect(process.env.DB_NAME).toEqual(expect.any(String));
    // not testing other values because they can be null
    done();
  });
  it('should set config for production env', done => {
    process.env.NODE_ENV = 'production';
    Config.load();
    // checking if values are set
    expect(process.env.SERVER_PORT).toEqual(expect.any(String));
    expect(process.env.DB_HOST).toEqual(expect.any(String));
    expect(process.env.DB_USER).toEqual(expect.any(String));
    expect(process.env.DB_PASS).toEqual(expect.any(String));
    expect(process.env.DB_NAME).toEqual(expect.any(String));
    // not testing other values because they can be null
    done();
  });
});
