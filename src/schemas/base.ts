import { z } from 'zod'

export const ModelSchemaBase = {
  id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
}
