import tubeSearch from 'youtube-search';
import logger from './logger';

const searchRemoteVideos = async name => {
  try {
    const opts = {
      maxResults: 6,
      type: 'video',
      key: process.env.YOUTUBE_API_KEY
    };
    const res = await tubeSearch(name, opts);
    return res;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

export default searchRemoteVideos;
