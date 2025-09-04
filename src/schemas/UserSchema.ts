import { CountryType } from 'src/types/club-portal-enums'
import { z } from 'zod'
import { ModelSchemaBase } from './base'
import { ClubInlineSchema } from './ClubSchema'

export const UserTokenSchema: z.ZodSchema<{ token: string }> = z.object({
  token: z.string(),
})

export const UserSchema: z.ZodSchema<IUser> = z.object({
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
  is_onboarded: z.boolean(),
  is_email_verified: z.boolean(),
  can_authenticate: z.boolean(),
  is_club_admin: z.boolean(),
  profile: z.object({
    is_school_email_verified: z.boolean(),
    image: z.string(),
    name: z.string(),
    phone: z.string().nullish(),
    bio: z.string().nullish(),
    city: z.string().nullish(),
    state: z.string().nullish(),
    country: z.nativeEnum(CountryType).nullish(),
    graduation_date: z.string().nullish(),
  }),
})
