import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  jwtSign(payload: any): string {
    const sign = jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      algorithm: this.configService.get('JWT_ALGORITHM'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      issuer: this.configService.get('JWT_ISSUER'),
    });
    return sign;
  }

  jwtDecode<T>(token: string): T {
    const decoded = jwt.verify(token, this.configService.get('JWT_SECRET'), {
      algorithms: [this.configService.get('JWT_ALGORITHM')],
      issuer: this.configService.get('JWT_ISSUER'),
    });
    return decoded as T;
  }
}
