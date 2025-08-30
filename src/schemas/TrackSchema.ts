import { z } from 'zod'
import { ModelSchemaBase } from './base'
import { JukeSessionSchema } from './JukeSessionSchema'

export const TrackSchema: z.ZodSchema<ITrack> = z.object({
  ...ModelSchemaBase,
  name: z.string(),
  artists: z.array(z.string()),
  album: z.string(),
  uri: z.string(),
  preview_url: z.string().nullable(),
  is_explicit: z.boolean(),
  type: z.enum(['track']),
  duration_ms: z.number(),
  release_year: z.number(),
  spotify_id: z.string(),
  spotify_uri: z.string(),
})

const QueuedTrackSchema: z.ZodSchema<IQueuedTrack> = z.object({
  ...ModelSchemaBase,
  juke_session: JukeSessionSchema,
  queued_by: z.object({ user_id: z.number() }),
  track: TrackSchema,
  likes: z.number(),
  dislikes: z.number(),
  played: z.boolean(),
  played_at: z.string().date(),
  order: z.number(),
  is_editable: z.boolean(),
})

export const QueuedTrackListSchema = z.array(QueuedTrackSchema)

export const PlayerStateSchema: z.ZodSchema<IPlayerState> = z.object({
  jukebox_id: z.number(),
  queued_track: QueuedTrackSchema.optional(),
  spotify_track: TrackSchema.optional(),
  progress: z.number(),
  last_progress_update: z.string().date(),
  is_playing: z.boolean(),
  current_device_id: z.string().optional(),
  juke_session_id: z.number().optional(),
})

export const TrackSearchResult: z.ZodSchema<any> = z.object({
  href: z.string(),
  items: z.array(TrackSchema),
  limit: z.number(),
  next: z.string().nullable(),
  offset: z.number(),
  previous: z.string().nullable(),
  total: z.number(),
})

export const TrackListResult: z.ZodSchema<any> = z.object({
  tracks: TrackSearchResult,
})

export const deleteTrackResultSchema: z.ZodSchema<any> = z.object({
  item: QueuedTrackSchema,
})

export const deleteTrackListResult = z.array(deleteTrackResultSchema)
