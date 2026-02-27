import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZodValidationPipe } from 'src/@pipes/zod/zod_validation.pipe';
import { UserId } from 'src/auth/jwt.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { type LoginDTO, LoginDTOSchema } from './dto/login.dto';
import { UserService } from './user.service';
import { toPublicUser } from './presenter/public_user.presenter';

@Controller('auth')
export class AuthController {
  constructor(
    readonly userService: UserService,
    readonly jwtService: JwtService,
  ) {}

  @Post()
  async login(@Body(new ZodValidationPipe(LoginDTOSchema)) form: LoginDTO) {
    const user = await this.userService.login(form);

    const token = await this.jwtService.signAsync({}, { subject: user.id });
    return {
      token,
    };
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  async getMe(@UserId() user_id: string) {
    const user = await this.userService.getMe(user_id);
    return toPublicUser(user);
  }
}
