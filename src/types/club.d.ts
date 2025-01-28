declare type ClubRole = 'president' | 'officer' | 'member'
declare interface IClubMember extends IModel {
  user_id: number
  username: string
  owner: boolean
  role: ClubRole
  points: number
}

declare interface IClub extends IModel {
  name: string
  logo?: string
  members: IClubMember[]
}
