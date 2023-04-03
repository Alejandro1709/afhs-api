import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import characterRoutes from './routers/character.routes';
import secrets from './config/secrets';
import { connectDb } from './config/db';

const { NODE_ENV, PORT, MONGO, CLIENT_URL } = secrets;

const app = express();

connectDb(MONGO as string);

app.use(express.json());
app.use(cors({ origin: CLIENT_URL }));

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/characters', characterRoutes);

app.get('/', (_req, res) => {
  res.status(401).send('Not Authorized');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
