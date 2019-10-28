import Redis from 'ioredis';
import Database from '../services/db';
import searchRemoteInfo from '../services/searchRemoteInfo';
import generateDTO from '../models/api/info/generateInfoDTO';

const getInfo = async (req, res) => {
  let status;
  const cache = new Redis({
    port: 6379, // Redis port
    host: '127.0.0.1', // Redis host
    db: 0
  });

  let profile = await cache.get(req.params.name);
  // we need to decode the Json string from Redis
  profile = JSON.parse(profile);
  status = 'cache';

  if (!profile) {
    profile = await Database.findByName(req.params.name);
    status = 'db';

    // if data is not on db search remotely
    if (profile === undefined) {
      profile = await searchRemoteInfo(req.params.name);
      status = 'remote';

      // if remote search fails return error
      if (profile === undefined) {
        status = 'error';
      } else {
        // save data to db, this should be sync
        Database.insertProfile(profile);
        // cache data with expiration time 1h
        cache.set(req.params.name, JSON.stringify(profile), 'EX', 3600);
      }
    } else {
      // profile is on the database but not in cache, so we cache it for 1h
      cache.set(req.params.name, JSON.stringify(profile), 'EX', 3600);
    }
  }

  const response = generateDTO(profile, status);

  return res.status(response.status).send(response);
};

export default getInfo;
