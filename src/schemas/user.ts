import { z } from 'zod'
import { ModelSchemaBase } from './base'
import { ClubInlineSchema } from './club'

export const UserDetailsSchema: z.ZodSchema<IUserDetails> = z.object({
  ...ModelSchemaBase,
  email: z.string(),
  username: z.string(),
  first_name: z
    .string()
    .nullish()
    .transform((val) => val ?? undefined) as any,
  last_name: z
    .string()
    .nullish()
    .transform((val) => val ?? undefined) as any,
  image: z
    .string()
    .nullish()
    .transform((val) => val ?? undefined) as any,
  clubs: z.array(ClubInlineSchema),
})
