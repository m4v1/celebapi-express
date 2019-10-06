import Database from '../services/db';
import searchRemoteInfo from '../services/searchRemoteInfo';
import SuccessResponse from '../models/api/apiSuccess';
import ErrorResponse from '../models/api/apiError';

const generateDTO = (data, status) => {
  switch (status) {
    case 'db':
      return SuccessResponse.format(data, 'db', 200);
    case 'remote':
      return SuccessResponse.format(data, 'remote', 200);
    case 'error':
      return ErrorResponse.format({}, 'Profile not found', 404);
    default:
      return ErrorResponse.format({}, 'Generic Error', 500);
  }
};

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
      const insert = Database.insertProfile(profile);
      console.log(insert);
    }
  }
  const response = generateDTO(profile, status);

  res.status(response.status).send(response);
};

export default getInfo;
