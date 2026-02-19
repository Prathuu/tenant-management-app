import { JwtUser } from '../auth/types/jwt-user.type';

declare module 'express-serve-static-core' {
  interface Request {
    user: JwtUser;
  }
}
