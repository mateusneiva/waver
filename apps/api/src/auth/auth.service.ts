import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async handleDiscordCallback(code: string) {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = process.env.DISCORD_REDIRECT_URI;

    const tokenResponse = await this.httpService
      .post('https://discord.com/api/oauth2/token', null, {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await this.httpService
      .get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .toPromise();

    return userResponse.data;
  }
}
