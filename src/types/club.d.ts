declare interface IClubMembership {
  club_id: number
  created_at: string
  id: number
  is_owner: boolean
  points: number
  updated_at: string
  user: IClubUser
}

declare interface IClubUser {
  id: number
  email: string
  first_name: string | null
  last_name: string | null
  username: string
}