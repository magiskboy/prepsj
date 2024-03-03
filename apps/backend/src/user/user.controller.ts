import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: Request) {
    const user = await this.userService.findUserByEmail(req.user.email);
    if (user) {
      return {
        data: user,
      };
    }
    throw new NotFoundException('User not found');
  }
}
