import z from 'zod';

export const LoginDTOSchema = z
  .object({
    login: z.string().min(1),
    password: z.string().min(1),
  })
  .required();

export type LoginDTO = z.output<typeof LoginDTOSchema>;
