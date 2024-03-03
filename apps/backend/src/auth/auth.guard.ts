import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { IJwtPayload } from 'src/auth/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['_t'];
    if (!token) {
      return false;
    }
    const payload = this.authService.jwtDecode<IJwtPayload>(token);
    request.user = {
      ...payload,
      token,
    };
    return Boolean(payload);
  }
}
