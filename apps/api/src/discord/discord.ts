import { AxiosResponse } from 'axios';
import { GuildBanType, PartialGuildChannel } from '../utils/types';

export interface IDiscordService {
  getBotGuilds();
  getUserGuilds(accessToken: string);
  getMutualGuilds(accessToken: string);
  getGuild(guildId: string): Promise<AxiosResponse<PartialGuildChannel>>;
  getGuildChannels(
    guildId: string,
  ): Promise<AxiosResponse<PartialGuildChannel[]>>;
  getGuildBans(guildId: string): Promise<AxiosResponse<GuildBanType[]>>;
  deleteGuildBan(guildId: string, userId: string): Promise<AxiosResponse>;
}
