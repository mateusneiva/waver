import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { ROUTES } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
import { AuthenticatedGuard, DiscordAuthGuard } from './utils/Guards';

import { User } from '../entities/user.entity';

@Controller(ROUTES.AUTH)
export class AuthController {
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.redirect('http://localhost:3000/dashboard');
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@AuthUser() user: User) {
    return {
      id: user.discordId,
      avatar: user.avatar,
      displayName: user.displayName,
      username: user.username,
    };
  }

  @Post('logout')
  logout() {}
}
