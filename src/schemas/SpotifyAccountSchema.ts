import { z } from 'zod'
import { ModelSchemaBase } from './base'

export const SpotifyAccountSchema: z.ZodSchema<ISpotifyAccount> = z.object({
  ...ModelSchemaBase,
  access_token: z.string(),
  refresh_token: z.string(),
  user_id: z.number(),
  spotify_email: z.string(),
  expires_in: z.number(),
  expires_at: z.string(),
  token_type: z.string(),
})

export const SpotifyAuthRedirectUrlSchema: z.ZodSchema<{ url: string }> =
  z.object({
    url: z.string().startsWith('https://accounts.spotify.com/authorize'),
  })
