import { Repository } from 'typeorm';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IGuildsService } from './guilds.interface';
import { ROUTES, SERVICES } from '../utils/constants';
import { WebsocketHandler } from '../websocket/socket';
import { GuildConfiguration } from 'src/entities/guildConfiguration.entity';

@Controller(ROUTES.GUILDS)
export class GuildsController {
  constructor(
    @Inject(SERVICES.GUILDS) private readonly guildsService: IGuildsService,
    @Inject(WebsocketHandler) private readonly wsHandler: WebsocketHandler,
    @InjectRepository(GuildConfiguration)
    private readonly guildConfigurationRepository: Repository<GuildConfiguration>,
  ) {}

  @Get('config/:guildId')
  async getGuildConfig(@Param('guildId') guildId: string) {
    console.log('Get GuildConfig');

    const guildConfig = await this.guildsService.getGuildConfig(guildId);

    if (!guildConfig) {
      const guildConfiguration = new GuildConfiguration();

      guildConfiguration.guildId = guildId;

      const newGuildConfiguration =
        this.guildConfigurationRepository.create(guildConfiguration);

      return this.guildConfigurationRepository.save(newGuildConfiguration);
    }

    return guildConfig;
  }

  @Post('config/:guildId/prefix')
  async updateGuildPrefix(
    @Param('guildId') guildId: string,
    @Body('prefix') prefix: string,
  ) {
    const config = await this.guildsService.updateGuildPrefix(guildId, prefix);
    this.wsHandler.guildPrefixUpdate(config);
    return config;
  }

  @Post('config/:guildId/welcome')
  async updateWelcomeChannel(
    @Param('guildId') guildId: string,
    @Body('channelId') channelId: string,
  ) {
    return this.guildsService.updateWelcomeChannel(guildId, channelId);
  }

  @Get('config/:guildId/bans')
  async getGuildBans(
    @Param('guildId') guildId: string,
    @Query('fromDate') fromDate: Date,
  ) {
    return this.guildsService.getGuildBans(guildId, fromDate);
  }

  @Get('guild/:guildId/logs')
  async getGuildLogs(
    @Param('guildId') guildId: string,
    @Query('fromDate') fromDate: Date,
  ) {
    return this.guildsService.getGuildLogs(guildId, fromDate);
  }
}
