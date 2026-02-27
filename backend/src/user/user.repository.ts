import { Injectable } from '@nestjs/common';
import { ObjectChanges } from 'src/utils/object_changes';
import { UserModel } from './database/user.model';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor() {}

  async findByLogin(login: string): Promise<User | null> {
    const result = await UserModel.query()
      .andWhere('username', login)
      .first();
    return result?.toEntity() ?? null;
  }

  async create(user: User): Promise<void> {
    await UserModel.query()
      .insert(UserModel.toDatabase(user));
  }

  async findByUsername(
    username: string,
  ): Promise<User | null> {
    const result = await UserModel.query()
      .findOne('username', username);
    return result?.toEntity() ?? null;
  }

  async findById(user_id: string): Promise<User | null> {
    const result = await UserModel.query()
      .findOne('id', user_id);
    return result?.toEntity() ?? null;
  }

  async update(user: User) {
    const diff = ObjectChanges.get(user);
    if (!diff) {
      return;
    }
    await UserModel.query()
      .update(UserModel.toDatabase(diff))
      .andWhere('id', user.id);
  }

  async delete(user_id: string): Promise<void> {
    await UserModel.query()
      .deleteById(user_id);
  }
}
