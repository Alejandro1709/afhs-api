import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const { NODE_ENV, PORT } = process.env;

export default {
  PORT,
  NODE_ENV,
};
