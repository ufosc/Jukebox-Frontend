declare interface IClubFields {
  name: string
  ownerId: string
  spotifyAuthId?: string
  defaultDeviceId?: string
}

declare interface IClub extends IClubFields {
  id: string
}

declare interface ISpotifyAuth {
  id: string
  accessToken: string
  userId: string
  spotifyEmail: string
  expiresIn: number
  tokenType: string
  expiresAt: number
}
