import tubeSearch from 'youtube-search';
import logger from './logger';

const manageVideoError = () => {
  // nullify errors from api depleted quota
  return null;
};

const searchRemoteVideos = async (name) => {
  try {
    const opts = {
      maxResults: 6,
      type: 'video',
      key: process.env.YOUTUBE_API_KEY,
    };
    const res = await tubeSearch(name, opts, manageVideoError);
    return res;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

export default searchRemoteVideos;
