import type { IJwtPayload } from 'src/auth/types';

declare global {
  namespace Express {
    interface Request {
      user: IJwtPayload & {
        token: string;
      };
    }
  }
}
