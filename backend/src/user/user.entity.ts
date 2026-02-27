import { v7 as uuidv7 } from 'uuid';

export class User {
  id: string;
  full_name: string;
  username: string;
  password: string;
  picture_url?: string;
  last_login: Date;
  created_at: Date;
  updated_at: Date;

  constructor(user: Partial<User>) {
    user.id ??= uuidv7();
    user.created_at ??= new Date();
    user.last_login ??= new Date(user.created_at);
    user.updated_at ??= new Date(user.created_at);
    Object.assign(this, user);
  }

  assign(data: Partial<this>): this {
    Object.assign(this, data);
    this.updated_at = new Date();
    return this;
  }
}
