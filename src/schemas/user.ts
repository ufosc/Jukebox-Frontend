import { z } from 'zod'
import { ModelSchemaBase } from './base'
import { ClubInlineSchema } from './club'
import { CountryType } from 'src/types/club-portal-enums'

export const UserTokenSchema: z.ZodSchema<{ token: string }> = z.object({
  token: z.string(),
})

export const UserDetailsSchema: z.ZodSchema<IUser> = z.object({
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
    phone: z.string().optional(),
    bio: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.nativeEnum(CountryType).optional(),
    graduation_date: z.string().optional(),
  }),
})

export const SpotifyLinkSchema: z.ZodSchema<ISpotifyLink> = z.object({
  ...ModelSchemaBase,
  deleted_on: z.string().nullable(),
  access_token: z.string(),
  refresh_token: z.string(),
  user_id: z.number(),
  spotify_email: z.string(),
  expires_in: z.number(),
  expires_at: z.string(),
  token_type: z.string(),
})

export const SpotifyLinksSchema = z.array(SpotifyLinkSchema)
