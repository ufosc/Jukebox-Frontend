import { z } from 'zod'
import { ModelSchemaBase } from './base'
import { SpotifyAccountSchema } from './SpotifyAccountSchema'

export const JukeboxSchema: z.ZodSchema<IJukebox> = z.object({
  ...ModelSchemaBase,
  name: z.string(),
  club_id: z.number(),
  time_format: z.enum(['12-hour', '24-hour']),
  queue_size: z.number(),
})

export const JukeboxListSchema = z.array(JukeboxSchema)

export const AccountLinkSchema: z.ZodSchema<IAccountLink> = z.object({
  ...ModelSchemaBase,
  spotify_account: SpotifyAccountSchema,
  jukebox_id: z.number(),
  active: z.boolean(),
})
