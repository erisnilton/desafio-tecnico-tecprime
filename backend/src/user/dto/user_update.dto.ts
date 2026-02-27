import z from 'zod';
import { UserRegisterDTOSchema } from './user_resgister.dto';

export const UpdateUserDTOSchema = UserRegisterDTOSchema.partial()

export type UpdateUserDTO = z.output<typeof UpdateUserDTOSchema>;
