import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { UserId } from 'src/auth/jwt.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ZodValidationPipe } from '../@pipes/zod/zod_validation.pipe';
import {
  type UserRegisterDTO,
  UserRegisterDTOSchema,
} from './dto/user_resgister.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createUser(
    @Body(new ZodValidationPipe(UserRegisterDTOSchema))
    userData: UserRegisterDTO,
    @UserId() user_id: string,
  ) {
    await this.userService.register(user_id, userData);
  }
}
