import { z } from 'zod'
import { ModelSchemaBase } from './base'

export const JukeboxSchema: z.ZodSchema<IJukebox> = z.object({
  ...ModelSchemaBase,
  name: z.string(),
  club_id: z.number(),
  time_format: z.enum(['12-hour', '24-hour']),
  queue_size: z.number(),
})

export const JukeboxListSchema = z.array(JukeboxSchema)
