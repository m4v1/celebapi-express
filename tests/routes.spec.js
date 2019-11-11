import faker from 'faker';
import request from 'supertest';
import moment from 'moment';
import Redis from 'ioredis';
import app, { server } from '../src/index';
import { knex } from '../src/services/db';

// setting a seed so results are consistent with db seeded data
faker.seed(15646525);

// cache handler is needed to flush redis before each test
const cache = new Redis({
  port: 6379, // Redis port
  host: '127.0.0.1', // Redis host
  db: 0
});

beforeEach(() => {
  // flushing cache on every test to prevent inconsistent results
  cache.flushdb();
});

afterAll(() => {
  // disconnect services
  cache.disconnect();
  server.close();
  knex.destroy();
});

describe('Get /info/ Endpoints', () => {
  it('should get a / route default message', async done => {
    const res = await request(app).get(`/`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(expect.stringContaining('Nothing to see here'));
    done();
  });

  it('should get a /info/ route profile from db', async done => {
    const name = faker.name.findName().toLowerCase();
    const bday = moment(faker.date.past()).format('Y-MM-DD');
    const bplace = faker.address.country();
    const bio = faker.lorem.text(faker.random.number(150));

    const res = await request(app).get(`/info/${name}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.name).toBeTruthy();
    expect(res.body.data.bday).toEqual(bday);
    expect(res.body.data.bplace).toBeTruthy();
    expect(res.body.data.bplace).toEqual(bplace);
    expect(res.body.data.bio).toBeTruthy();
    expect(res.body.data.bio).toEqual(bio);
    expect(res.body.status).toEqual(200);
    // data source should be db
    expect(res.body.message).toEqual('db');
    done();
  });

  it('should get a /info/ route profile from cache', async done => {
    const name = faker.name.findName().toLowerCase();
    const bday = moment(faker.date.past()).format('Y-MM-DD');
    const bplace = faker.address.country();
    const bio = faker.lorem.text(faker.random.number(150));

    let res = await request(app).get(`/info/${name}`);
    // rerun request to get cached result
    res = await request(app).get(`/info/${name}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.name).toBeTruthy();
    expect(res.body.data.bday).toEqual(bday);
    expect(res.body.data.bplace).toBeTruthy();
    expect(res.body.data.bplace).toEqual(bplace);
    expect(res.body.data.bio).toBeTruthy();
    expect(res.body.data.bio).toEqual(bio);
    expect(res.body.status).toEqual(200);
    // data source should be db
    expect(res.body.message).toEqual('cache');
    done();
  });

  it('should get a /info/ route profile from remote src', async done => {
    const name = String('Michael Jackson').toLowerCase();
    const bday = '1958-08-29';
    const bplace = 'Gary IN';

    const res = await request(app).get(`/info/${name}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.name).toBeTruthy();
    expect(res.body.data.bday).toEqual(bday);
    expect(res.body.data.bplace).toBeTruthy();
    expect(res.body.data.bplace).toEqual(bplace);
    expect(res.body.data.bio).toBeTruthy();
    expect(res.body.status).toEqual(200);
    // data source should be remote
    expect(res.body.message).toEqual('remote');
    done();
  });

  it('should get 404 for the /info/ route', async done => {
    // there are 10 profiles in db, let's create the 11th to create a 404 error
    let name = null;
    for (let index = 0; index < 11; index += 1) {
      name = faker.name.findName();
    }
    name = name.toLowerCase();

    let res = await request(app).get(`/info/${name}`);
    // rerun request to get cached result
    res = await request(app).get(`/info/${name}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('data');
    expect(res.body.status).toEqual(404);
    done();
  });

  it('should get 404 for the /info/ route from cache', async done => {
    // there are 10 profiles in db, from now on every new one should give 404
    let name = faker.name.findName();
    name = name.toLowerCase();

    const res = await request(app).get(`/info/${name}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('data');
    expect(res.body.status).toEqual(404);
    done();
  });
});

describe('Get /videos/ Endpoints', () => {
  it('should get a /videos/ route list from remote src', async done => {
    const name = String('Michael Jackson').toLowerCase();

    const res = await request(app).get(`/videos/${name}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    const numberOfVideos = res.body.data.length;
    expect(numberOfVideos).toBeLessThanOrEqual(6);
    for (let index = 0; index < numberOfVideos; index += 1) {
      const expected = {
        link: expect.stringMatching('.*'),
        title: expect.stringMatching('.*'),
        thumb: expect.stringMatching('.*')
      };
      expect(res.body.data[index]).toEqual(expect.objectContaining(expected));
    }
    expect(res.body.status).toEqual(200);
    // data source should be remote
    expect(res.body.message).toEqual('remote');
    done();
  });

  it('should get a /videos/ route list from cache', async done => {
    const name = String('Michael Jackson').toLowerCase();

    let res = await request(app).get(`/videos/${name}`);
    // rerun request to get cached result
    res = await request(app).get(`/videos/${name}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    const numberOfVideos = res.body.data.length;
    expect(numberOfVideos).toBeLessThanOrEqual(6);
    for (let index = 0; index < numberOfVideos; index += 1) {
      const expected = {
        link: expect.stringMatching('.*'),
        title: expect.stringMatching('.*'),
        thumb: expect.stringMatching('.*')
      };
      expect(res.body.data[index]).toEqual(expect.objectContaining(expected));
    }
    expect(res.body.status).toEqual(200);
    // data source should be cache
    expect(res.body.message).toEqual('cache');
    done();
  });

  it('should get a /videos/ route 404 error', async done => {
    // this string should be random enough not to produce results
    const name = faker.random.alphaNumeric(12).toLowerCase();

    const res = await request(app).get(`/videos/${name}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('data');
    const numberOfVideos = res.body.data.length;
    expect(numberOfVideos).toEqual(0);
    expect(res.body.status).toEqual(404);
    // data source should be remote
    expect(res.body.message).toEqual(expect.stringMatching('.*'));
    done();
  });

  it('should get a /videos/ route 404 error from cache', async done => {
    // this string should be random enough not to produce results
    const name = faker.random.alphaNumeric(12).toLowerCase();

    let res = await request(app).get(`/videos/${name}`);
    // rerun request to get cached result
    res = await request(app).get(`/videos/${name}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('data');
    const numberOfVideos = res.body.data.length;
    expect(numberOfVideos).toEqual(0);
    expect(res.body.status).toEqual(404);
    // data source should be remote
    expect(res.body.message).toEqual(expect.stringMatching('.*'));
    done();
  });
});
