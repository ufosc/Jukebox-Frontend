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

declare interface IClubLogo {
  id: number
  display_name: string
  url: string
  size: unknown
}

declare interface IUserDetailsAdd extends IUserDetails {
  profile: {
    is_school_email_verified: boolean
    image: string | null
    phone?: string | null
    name: string | null
    bio?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    birthday?: string | null
    school_email?: string | null
    major?: string | null
    minor?: string | null
    college?: string | null
    graduation_date?: string | null
  }
}
