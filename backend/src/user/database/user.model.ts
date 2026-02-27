import { Model } from 'objection';
import { ObjectChanges } from 'src/utils/object_changes';
import { removeUndefined } from 'src/utils/remove_undefined';
import { User } from '../user.entity';

export class UserModel extends Model {
  static get tableName() {
    return 'user';
  }

  id: string;
  full_name: string;
  username: string;
  picture_url?: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  static toDatabase(user: Partial<User>) {
    return removeUndefined<UserModel>({
      id: user.id,
      full_name: user.full_name,
      username: user.username,
      password: user.password,
      picture_url: user.picture_url,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  }

  toEntity(): User {
    return ObjectChanges.create(
      new User({
        id: this.id,
        full_name: this.full_name,
        username: this.username,
        picture_url: this.picture_url,
        password: this.password,
        created_at: this.created_at,
        updated_at: this.updated_at,
      }),
    );
  }
}
