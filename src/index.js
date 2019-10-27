import express from 'express';
import helmet from 'helmet';
import {} from 'dotenv/config';
import tracer from 'dd-trace';
import getInfo from './routes/info';
import getVideos from './routes/videos';

if (process.env.NODE_ENV === 'production') {
  tracer.init({
    analytics: true
  });
}

const app = express();

app.use(helmet());

app.get('/', (req, res) => res.send('Nothing to see here'));
app.get('/videos/:name', getVideos);
app.get('/info/:name', getInfo);

app.listen(process.env.SERVER_PORT, '127.0.0.1');
