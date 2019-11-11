import Database from '../services/db';
import searchRemoteInfo from '../services/searchRemoteInfo';
import generateDTO from '../models/api/info/generateInfoDTO';
import cache from '../services/cache';

const getInfo = async (req, res) => {
  let status;

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
        /*
         *  if profile can't be get from remote we set it to {} for 6h
         *  this is to speed up future requests and bypass remote search
         */
        cache.set(req.params.name, JSON.stringify({}), 'EX', 21600);
      } else {
        // save data to db
        Database.insertProfile(profile);
        // cache data with expiration time 1h
        cache.set(req.params.name, JSON.stringify(profile), 'EX', 3600);
      }
    } else {
      // profile is on the database but not in cache, so we cache it for 1h
      cache.set(req.params.name, JSON.stringify(profile), 'EX', 3600);
    }
  } else if (Object.entries(profile).length === 0) {
    // profile is on the cache but it's an empty object, we return 404
    status = 'error';
  }

  const response = generateDTO(profile, status);

  return res.status(response.status).send(response);
};

export default getInfo;
