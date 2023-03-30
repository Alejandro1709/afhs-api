import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { NODE_ENV, PORT, MONGO_URI_PROD, MONGO_URI_DEV } = process.env;

const MONGO = NODE_ENV === 'production' ? MONGO_URI_PROD : MONGO_URI_DEV;

export default {
  PORT,
  NODE_ENV,
  MONGO,
};
