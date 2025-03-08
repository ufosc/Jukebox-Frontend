import { z } from 'zod'
import { ModelSchemaBase } from './base'

export const ClubMemberSchema: z.ZodSchema<IClubMember> = z.object({
  ...ModelSchemaBase,
  user_id: z.number(),
  username: z.string(),
  owner: z.boolean(),
  role: z.enum(['president', 'officer', 'member']),
  points: z.number(),
})

export const ClubSchema: z.ZodSchema<IClub> = z.object({
  ...ModelSchemaBase,
  name: z.string(),
  logo: z.string().nullish(),
  // members: z.array(ClubMemberSchema),
})

export const ClubInlineSchema = z.object({
  id: z.number(),
  name: z.string(),
  // role: z.string(),
})
