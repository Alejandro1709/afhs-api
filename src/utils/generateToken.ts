import jwt from 'jsonwebtoken';
import sectets from '../config/secrets';

const { JWT_SECRET, JWT_EXPIRES_IN } = sectets;

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export default generateToken;