import { z } from 'zod'
import { ModelSchemaBase } from './base'

export const JukeboxLinkSchema: z.ZodSchema<IJukeboxLink> = z.object({
  ...ModelSchemaBase,
  type: z.enum(['spotify']),
  email: z.string(),
  active: z.boolean(),
})

export const JukeboxSchema: z.ZodSchema<IJukebox> = z.object({
  ...ModelSchemaBase,
  name: z.string(),
  club_id: z.number(),
  links: z.array(JukeboxLinkSchema),
})
