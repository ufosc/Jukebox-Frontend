declare interface IUser {
  id: number
  email: string
  username: string
  first_name?: string
  last_name?: string
  image?: string
  clubs: IClub[]
}
