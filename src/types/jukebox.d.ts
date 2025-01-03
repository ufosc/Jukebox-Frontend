declare interface IJukebox extends IModel {
  name: string
  club_id: number
  links: IJukeboxLink[]
}

declare type JukeboxLinkType = 'spotify'

declare interface IJukeboxLink extends IModel {
  type: JukeboxLinkType
  email: string
  active: boolean
}
