import { z } from 'zod'

export const ModelSchemaBase = {
  id: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
}
