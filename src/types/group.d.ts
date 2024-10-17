declare interface IClubFields {
  name: string
  ownerId: number
  spotifyAuthId?: string
  defaultDeviceId?: string
}

declare interface IClub extends IClubFields {
  id: number
}

declare interface ISpotifyAuth {
  id: number
  accessToken: string
  userId: number
  spotifyEmail: string
  expiresIn: number
  tokenType: string
  expiresAt: number
}
