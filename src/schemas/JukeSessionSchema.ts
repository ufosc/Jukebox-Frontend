import { z } from 'zod'
import { ModelSchemaBase } from './base'

export const JukeSessionSchema: z.Schema<IJukeSession> = z.object({
  ...ModelSchemaBase,
  jukebox_id: z.number(),
  join_code: z.string(),
  qr_code: z.string(),
  next_order: z.number(),
  start_at: z.string().datetime(),
  end_at: z.string().datetime(),
  is_active: z.boolean(),
})
