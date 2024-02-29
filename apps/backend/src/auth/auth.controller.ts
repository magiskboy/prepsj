import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

@Controller('auth')
export class AuthController {
  googleClient: OAuth2Client;

  constructor(configService: ConfigService) {
    this.googleClient = new google.auth.OAuth2({
      clientId: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
    });
  }

  @Get('/login')
  @Redirect()
  login() {
    const url = this.googleClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/userinfo.profile'],
      response_type: 'code',
      redirect_uri: 'http://localhost:3001/auth/callback',
    });
    return { url };
  }

  @Get('/callback')
  async callback(@Query('code') code: string) {
    const { tokens } = await this.googleClient.getToken(code);
    const userInfo = await google.oauth2('v2').userinfo.get({
      oauth_token: tokens.access_token,
    });
    return JSON.stringify(userInfo.data);
  }
}
