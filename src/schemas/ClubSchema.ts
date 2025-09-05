import { z } from 'zod'
import { ModelSchemaBase } from './base'

export const NestedClubFileSchema = z.object({
  id: z.number(),
  display_name: z.string(),
  url: z.string().url(),
  size: z.string(),
})
export const ClubSchema: z.Schema<IClub> = z.object({
  ...ModelSchemaBase,
  name: z.string(),
  logo: NestedClubFileSchema,
  banner: NestedClubFileSchema.nullish(),
  about: z.string().nullable(),
  founding_year: z.number(),
  contact_email: z.string().email().nullable(),
  alias: z.string().nullable(),
  color: z.string().optional(),
  majors: z.string().array(),
  default_role: z.string(),
  roles: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      is_default: z.boolean(),
      order: z.number(),
      role_type: z.enum(['admin', 'editor', 'viewer', 'follower', 'custom']),
    }),
  ),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      color: z.enum([
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'grey',
      ]),
      order: z.number(),
    }),
  ),
  socials: z.array(
    z.object({
      id: z.number(),
      url: z.string().url().nullable(),
      username: z.string().nullable(),
      social_type: z.enum([
        'discord',
        'instagram',
        'facebook',
        'twitter',
        'linkedin',
        'github',
        'website',
        'bluesky',
        'slack',
        'other',
      ]),
      order: z.number(),
    }),
  ),
  photos: z.array(
    z.object({
      id: z.number(),
      order: z.number(),
      file: z.object({
        id: z.number(),
        display_name: z.string(),
        url: z.string().url(),
        size: z.string(),
      }),
    }),
  ),
  member_count: z.number(),
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
})

export const ClubMembershipSchema: z.ZodSchema<IClubMembership> = z.object({
  ...ModelSchemaBase,
  club_id: z.number(),
  is_owner: z.boolean(),
  points: z.number(),
  user: z.object({
    id: z.number(),
    email: z.string().email(),
    image: z.string().url(),
    username: z.string(),
    name: z.string(),
  }),
  is_admin: z.boolean(),
  roles: z.array(z.string()),
  is_pinned: z.boolean(),
  is_viewer: z.boolean(),
  order: z.number(),
})

export const ClubMembershipListSchema = z.array(ClubMembershipSchema)
