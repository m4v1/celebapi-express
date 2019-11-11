/* eslint-disable global-require */
import Logger from '../src/services/logger';

Logger.error = jest.fn();

beforeEach(() => {
  Logger.error.mockClear();
});

describe('Check if app manages errors correctly', () => {
  it('Searching vidoes without api key should gently fail and log error', async done => {
    process.env.YOUTUBE_API_KEY = null;
    const searchRemoteVideos = require('../src/services/searchRemoteVideos')
      .default;
    const name = String('Michael Jackson').toLowerCase();
    const fail = await searchRemoteVideos(name);
    expect(fail).toBe(undefined);
    expect(Logger.error).toHaveBeenCalledTimes(1);
    done();
  });
});
