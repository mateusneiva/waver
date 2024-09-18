import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';

import { SERVICES } from '../../utils/constants';
import { IAuthService } from '../auth.interface';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SERVICES.AUTH) private readonly authService: IAuthService,
  ) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URL,
      scope: ['identify', 'email', 'guilds'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('DiscordStrategy Validate Method');

    return this.authService.validateUser({
      discordId: profile.id,
      avatar: profile.avatar,
      displayName: profile.global_name,
      username: profile.username,
      accessToken,
      refreshToken,
    });
  }
}
