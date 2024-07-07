import { Controller, Get } from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../domain/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get All Member' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [User],
  })
  @Get()
  async getAllMember() {
    return {
      message: 'success',
      data: await this.userService.getListMember(),
    };
  }
}
