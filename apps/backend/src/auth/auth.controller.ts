import { Controller, Get, Logger, Query, Redirect, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { AuthService } from 'src/auth/auth.service';
import { IGoogleUserInfo, IJwtPayload } from 'src/auth/types';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private googleClient: OAuth2Client;
  private readonly tokenExpiresIn: number;
  private readonly cookieDomain: string;
  private readonly GOOGLE_SCOPES = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    const googleRedirectURI = configService.get('GOOGLE_REDIRECT_URI');
    this.googleClient = new google.auth.OAuth2({
      clientId: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      redirectUri: googleRedirectURI,
    });

    this.tokenExpiresIn = Number(configService.get('JWT_EXPIRES_IN'));
    this.cookieDomain = configService.get('COOKIE_DOMAIN');
  }

  @Get('/login/google')
  @Redirect()
  loginGoogle() {
    const url = this.googleClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      response_type: 'code',
      scope: this.GOOGLE_SCOPES,
    });
    return { url };
  }

  @Get('/callback/google')
  async callbackGoogle(@Query('code') code: string, @Res() res: Response) {
    try {
      const { tokens } = await this.googleClient.getToken(code);
      const response = await google.oauth2('v2').userinfo.get({
        oauth_token: tokens.access_token,
      });
      const userInfo = response.data as IGoogleUserInfo;

      let user = await this.userService.findUserByEmail(userInfo.email);
      if (!user) {
        user = await this.userService.createGogoleUser(userInfo);
      }
      const payload: IJwtPayload = {
        sub: user.id,
        email: user.email,
        fullname: user.fullname,
      };
      const token = this.authService.jwtSign(payload);
      res.cookie('_t', token, {
        expires: new Date(Date.now() + this.tokenExpiresIn),
        httpOnly: true,
        domain: this.cookieDomain,
        secure: process.env.NODE_ENV === 'production',
      });
      res.redirect('http://prepsj.com');
      return res;
    } catch (e) {
      this.logger.error(e);
      return 'Something went wrong';
    }
  }
}
