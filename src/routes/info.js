import Database from '../services/db';
import searchRemoteInfo from '../services/searchRemoteInfo';
import generateDTO from '../models/api/info/generateInfoDTO';

const getInfo = async (req, res) => {
  let status;
  let profile = await Database.findByName(req.params.name);
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
    }
  }
  const response = generateDTO(profile, status);

  return res.status(response.status).send(response);
};

export default getInfo;
