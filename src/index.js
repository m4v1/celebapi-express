import express from 'express';
import helmet from 'helmet';
import tracer from 'dd-trace';
import {} from './config';
import getInfo from './routes/info';
import getVideos from './routes/videos';

if (process.env.NODE_ENV === 'production' && process.env.USE_DATADOG) {
  tracer.init();
  tracer.use('express', {
    analytics: true
  });
  tracer.use('mysql2', {
    analytics: true
  });
  tracer.use('ioredis', {
    analytics: true
  });
}

const app = express();

app.use(helmet());

app.get('/', (req, res) => res.send('Nothing to see here'));
app.get('/videos/:name', getVideos);
app.get('/info/:name', getInfo);

export const server = app.listen(process.env.SERVER_PORT, '127.0.0.1');

export default app;
