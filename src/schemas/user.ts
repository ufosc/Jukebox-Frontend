import { z } from 'zod'
import { ModelSchemaBase } from './base'
import { ClubSchema } from './club'

export const UserSchema: z.ZodSchema<IUser> = z.object({
  ...ModelSchemaBase,
  email: z.string(),
  username: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  image: z.string().optional(),
  clubs: z.array(ClubSchema),
})
