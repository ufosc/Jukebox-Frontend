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

export const ClubLogoSchema = z.object({
  id: z.number(),
  display_name: z.string(),
  url: z.string(),
  size: z.unknown().nullish(),
})

export const ClubListSchema = z.array(ClubSchema)

export const ClubInlineSchema = z.object({
  id: z.number(),
  name: z.string(),
  // role: z.string(),
})

export const UserSchema: z.ZodSchema<IClubUser> = z.object({
  id: z.number(),
  email: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  username: z.string(),
})

export const ClubMembershipSchema: z.ZodSchema<IClubMembership> = z.object({
  ...ModelSchemaBase,
  club_id: z.number(),
  is_owner: z.boolean(),
  points: z.number(),
  user: UserSchema,
  is_admin: z.boolean(),
  roles: z.array(z.string()),
})

export const ClubMembershipsSchema = z.array(ClubMembershipSchema);


