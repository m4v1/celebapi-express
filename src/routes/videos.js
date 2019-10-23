import searchRemoteVideos from '../services/searchRemoteVideos';
import generateDTO from '../models/api/videos/generateVideosDTO';

const getVideos = async (req, res) => {
  const videos = await searchRemoteVideos(req.params.name);
  const status = Object.entries(videos.results).length >= 1 ? 'ok' : 'error';
  const response = generateDTO(videos, status);
  return res.status(response.status).send(response);
};

export default getVideos;
