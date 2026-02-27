import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { UserRegisterDTO } from './dto/user_resgister.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(readonly userRepository: UserRepository) {}

  async login(input: LoginDTO) {
    const user = await this.userRepository.findByLogin(input.login);
    if (
      !user ||
      (user.password && !(await compare(input.password, user.password)))
    ) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    user.assign({ last_login: new Date() });
    await this.userRepository.update(user);
    return user;
  }

  async register(user_id: string, input: UserRegisterDTO) {
    const actor = await this.ensureUser(user_id);

    const user = new User({
      full_name: input.full_name,
      username: input.username,
      password: await hash(input.password, 10),
      picture_url: input.picture_url,
    });

    await this.userRepository.create(user);
  }

  async getMe(user_id: string) {
    return await this.ensureUser(user_id);
  }

  async ensureUser(user_id: string): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
