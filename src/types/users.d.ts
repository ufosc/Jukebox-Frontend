declare interface IUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  image?: string
  groups: { id: string; name: string }[]
}
