import { GuildBanLog } from '../entities/guildBanLog.entity';
import { GuildConfiguration } from '../entities/guildConfiguration.entity';
import { ModerationLog } from '../entities/moderationLog.entity';

export interface IGuildsService {
  getGuildConfig(guildId: string): Promise<GuildConfiguration>;
  updateGuildPrefix(
    guildId: string,
    prefix: string,
  ): Promise<GuildConfiguration>;
  updateWelcomeChannel(guildId: string, welcomeChannelId: string);
  getGuildBans(guildId: string, fromDate?: Date): Promise<GuildBanLog[]>;
  getGuildLogs(guildId: string, fromDate?: Date): Promise<ModerationLog[]>;
}
