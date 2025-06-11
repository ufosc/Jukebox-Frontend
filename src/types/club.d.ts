declare interface IClubMembership extends IModel {
  is_owner: boolean
  points: number
  user: IClubUser
  is_admin: boolean
  roles: string[]
}

declare interface IClubUser {
  id: number
  email: string
  first_name: string | null
  last_name: string | null
  username: string
}