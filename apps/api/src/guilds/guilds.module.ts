import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SERVICES } from '../utils/constants';
import { WebSocketModule } from '../websocket/websocket.module';

import { GuildsController } from './guilds.controller';
import { GuildsService } from './guilds.service';

import { GuildBanLog } from '../entities/guildBanLog.entity';
import { GuildConfiguration } from '../entities/guildConfiguration.entity';
import { ModerationLog } from '../entities/moderationLog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildConfiguration, GuildBanLog, ModerationLog]),
    WebSocketModule,
  ],
  controllers: [GuildsController],
  providers: [
    {
      provide: SERVICES.GUILDS,
      useClass: GuildsService,
    },
  ],
})
export class GuildsModule {}
