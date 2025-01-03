declare interface IUser extends IModel {
  id: number
  email: string
  username: string
  first_name?: string
  last_name?: string
  image?: string
  clubs: IClub[]
}
