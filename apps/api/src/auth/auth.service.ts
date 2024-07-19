import { Inject, Injectable } from '@nestjs/common';

import { SERVICES } from '../utils/constants';
import { UserDetails } from '../utils/types';

import { IUserService } from '../user/user.interface';
import { IAuthService } from './auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: IUserService,
  ) {}

  async validateUser(details: UserDetails) {
    const user = await this.userService.findUser(details.discordId);
    const { discordId, ...updatedDetails } = details;
    return user
      ? this.userService.updateUser(user, updatedDetails)
      : this.userService.createUser(details);
  }
}
