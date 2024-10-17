declare interface IUser {
  id: number
  email: string
  firstName?: string
  lastName?: string
  image?: string
  clubs: IClub[]
}
