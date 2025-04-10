import { z } from 'zod'
import { ModelSchemaBase } from './base'
import { ClubInlineSchema } from './club'

export const UserTokenSchema: z.ZodSchema<{ token: string }> = z.object({
  token: z.string(),
})

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
