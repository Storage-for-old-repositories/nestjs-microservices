import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('request')
  async createUser(
    @Body() payload: { email: string; name: string; age: number },
  ) {
    await this.userService.createRequestOnCreateUser(payload);
  }

  @Post('accept')
  async acceptUser(@Body() payload: { email: string; code: string }) {
    return this.userService.acceptRequestOnCreateUser(payload);
  }
}
