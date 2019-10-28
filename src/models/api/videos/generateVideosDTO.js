import SuccessResponse from './videosApiSuccess';
import ErrorResponse from '../apiError';

const generateDTO = (data, status) => {
  switch (status) {
    case 'remote':
      return SuccessResponse.format(data, 'remote', 200);
    case 'cache':
      return SuccessResponse.format(data, 'cache', 200);
    case 'error':
      return ErrorResponse.format({}, 'Videos not found', 404);
    default:
      return ErrorResponse.format({}, 'Generic Error', 500);
  }
};

export default generateDTO;
