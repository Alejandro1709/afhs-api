import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { NODE_ENV, PORT, MONGO_URI_PROD, MONGO_URI_DEV, CLIENT_URL, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const MONGO = NODE_ENV === 'production' ? MONGO_URI_PROD : MONGO_URI_DEV;

export default {
  PORT,
  NODE_ENV,
  MONGO,
  CLIENT_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
