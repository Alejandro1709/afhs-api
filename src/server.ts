import express from 'express';
import morgan from 'morgan';
import characterRoutes from './routers/character.routes';
import secrets from './config/secrets';
import { connectDb } from './config/db';

const { NODE_ENV, PORT, MONGO } = secrets;

const app = express();

connectDb(MONGO as string);

app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/characters', characterRoutes);

app.get('/', (_req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
