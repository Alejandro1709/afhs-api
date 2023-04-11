import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
// import xss from 'xss-clean';
import hpp from 'hpp';
import characterRoutes from './routers/character.routes';
import authRoutes from './routers/auth.routes';
import secrets from './config/secrets';
import { connectDb } from './config/db';

const { NODE_ENV, PORT, MONGO, CLIENT_URL } = secrets;

const app = express();

connectDb(MONGO as string);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(mongoSanitize());
//app.use(xss());
app.use(hpp());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/characters', characterRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', (_req, res) => {
  res.status(401).send('Not Authorized');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
