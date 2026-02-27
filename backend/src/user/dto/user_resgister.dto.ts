import z from 'zod';

export const UserRegisterDTOSchema = z.object({
  full_name: z
    .string()
    .min(1)
    .max(128)
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      'Full name can only contain letters and spaces',
    ),
  username: z
    .string()
    .min(1)
    .max(40)
    .regex(
      /^[A-Za-z\-_\.]+$/,
      'Username can only contain letters, numbers, dashes, underscores, and dots',
    ),
  milk_price: z.number().optional().default(0),
  picture_url: z.url().optional(),
  password: z
    .string()
    .min(6)
    .regex(/[A-Z]/g, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/g, 'Password must contain at least one lowercase letter')
    .regex(/\d/g, 'Password must contain at least one digit')
    .regex(
      /[^A-Za-z\d]/g,
      'Password must contain at least one special character',
    )
    .max(128, 'Password must not exceed 128 characters'),
});

export type UserRegisterDTO = z.output<typeof UserRegisterDTOSchema>;
