import SuccessResponse from './videosApiSuccess';
import ErrorResponse from '../apiError';

const generateDTO = (data, status) => {
  switch (status) {
    case 'ok':
      return SuccessResponse.format(data, 'ok', 200);
    case 'error':
      return ErrorResponse.format({}, 'Videos not found', 404);
    default:
      return ErrorResponse.format({}, 'Generic Error', 500);
  }
};

export default generateDTO;
