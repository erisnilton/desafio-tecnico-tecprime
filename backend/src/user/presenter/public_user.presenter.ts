import { PublicUserResponseDTO } from '../dto/public_user.response.dto';
import { User } from '../user.entity';

export function toPublicUser(user: User): PublicUserResponseDTO {
  return {
    id: user.id,
    full_name: user.full_name,
    username: user.username,
    picture_url: user.picture_url,
    last_login: user.last_login,
  };
}
