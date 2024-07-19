import { Module } from '@nestjs/common';

import { SERVICES } from '../utils/constants';

import { DiscordController } from './discord.controller';
import { DiscordHttpService } from './discord-http.service';
import { DiscordService } from './discord.service';

@Module({
  controllers: [DiscordController],
  providers: [
    {
      provide: SERVICES.DISCORD,
      useClass: DiscordService,
    },
    {
      provide: SERVICES.DISCORD_HTTP,
      useClass: DiscordHttpService,
    },
  ],
})
export class DiscordModule {}
