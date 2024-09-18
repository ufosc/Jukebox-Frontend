declare interface IGroupFields {
  name: string
  ownerId: string
  spotifyAuthId?: string
  defaultDeviceId?: string
}

declare interface IGroup extends IGroupFields {
  id: string
}

declare interface ISpotifyAuth {
  id: string
  accessToken: string
  userId: string
  spotifyEmail: string
  expiresIn: number
  tokenType: string
  expiresAt: Date
}
