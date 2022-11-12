import JWT from 'jsonwebtoken';
import config from '../config';
import { User } from '../models/User';

export default (user: User) => {
  return JWT.sign(
    {
      iat: Date.now(),
      iss: 'Mr-Chidex',
      id: user.id,
      email: user.email,
    },
    config.SECRET_KEY as string,
    { expiresIn: '48h' },
  );
};
