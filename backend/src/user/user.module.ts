import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
@Module({
  providers: [UserRepository, UserService],
  controllers: [UserController, AuthController],
  exports: [UserRepository, UserService],
})
export class UserModule {}
