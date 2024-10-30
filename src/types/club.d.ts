declare interface IClubMember {
  id: number
  user_id: number
  username: string
  owner: boolean
  role: 'president' | 'officer' | 'member'
  points: number
}

declare interface IClub {
  id: number
  name: string
  logo?: string
  members: IClubMember[]
}
