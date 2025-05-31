import { number, z } from 'zod'

const ArtistInlineDetailsSchema: z.ZodSchema<IArtistInlineDetails> = z.object({
  uri: z.string(),
  name: z.string(),
  id: z.string(),
  type: z.enum(['artist']),
  href: z.string(),
})

export const TrackDetailsSchema: z.ZodSchema<ITrackDetails> = z.object({
  id: z.string(),
  name: z.string(),
  artists: z.array(ArtistInlineDetailsSchema),
  album: z.object({
    name: z.string(),
    uri: z.string(),
    id: z.string(),
    type: z.enum(['album']),
    href: z.string(),
    album_type: z.enum(['album', 'single']),
    artists: z.array(ArtistInlineDetailsSchema),
    available_markets: z.array(z.string()),
    release_date: z.string(),
    release_date_precision: z.enum(['day']),
    total_tracks: z.number(),
    images: z.array(
      z.object({
        height: z.number().nullish(),
        width: z.number().nullish(),
        url: z.string(),
      }),
    ),
  }),
  uri: z.string(),
  preview_url: z.string().nullable(),
  explicit: z.boolean(),
  popularity: z.number(),
  disc_number: z.number(),
  track_number: z.number(),
  type: z.enum(['track']),
  duration_ms: z.number(),
})

export const TrackDetailsListSchema = z.array(TrackDetailsSchema)

const QueuedTrackSchema: z.ZodSchema<IQueuedTrack> = z.object({
  track: TrackDetailsSchema,
  queue_id: z.string(),
  recommended_by: z.string(),
  spotify_queued: z.boolean(),
  interactions: z.object({
    likes: z.number(),
    dislikes: z.number(),
  }),
})

export const QueuedTrackListSchema = z.array(QueuedTrackSchema)

export const PlayerStateSchema: z.ZodSchema<IPlayerState> = z.object({
  jukebox_id: z.number(),
  current_track: QueuedTrackSchema.optional(),
  progress: z.number(),
  is_playing: z.boolean(),
})

export const TrackSearchResult: z.ZodSchema<ITrackSearch> = z.object({
  href: z.string(),
  items: z.array(TrackDetailsSchema),
  limit: z.number(),
  next: z.string().nullable(),
  offset: z.number(),
  previous: z.string().nullable(),
  total: z.number(),

})

export const TrackListResult: z.ZodSchema<ITrackSeachList> = z.object({
  tracks: TrackSearchResult,
})

export const deleteTrackResultSchema: z.ZodSchema<IRemovedTrack> = z.object({
  item: QueuedTrackSchema,
})

export const deleteTrackListResult = z.array(deleteTrackResultSchema)

export const swapTrackSchema = z.number()
