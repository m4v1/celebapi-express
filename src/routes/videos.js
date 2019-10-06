import searchRemoteInfo from '../services/searchRemoteInfo';

const getVideos = async (req, res) => {
  const profile = await searchRemoteInfo(req.params.name);
  res.send(profile);
};

export default getVideos;
