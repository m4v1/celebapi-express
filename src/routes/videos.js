import searchRemoteVideos from '../services/searchRemoteVideos';
import generateDTO from '../models/api/videos/generateVideosDTO';
import cache from '../services/cache';

const getVideos = async (req, res) => {
  let videos = await cache.get(`${req.params.name}-videos`);
  videos = JSON.parse(videos);
  let status = 'cache';

  if (!videos) {
    videos = await searchRemoteVideos(req.params.name);
    if (!videos) {
      const response = generateDTO([], 'error');
      return res.status(response.status).send(response);
    }
    status = Object.entries(videos.results).length >= 1 ? 'remote' : 'error';
    if (status === 'remote') {
      // cache data with expiration time 1h
      cache.set(`${req.params.name}-videos`, JSON.stringify(videos), 'EX', 86400);
    }
  }
  const response = generateDTO(videos, status);

  return res.status(response.status).send(response);
};

export default getVideos;
