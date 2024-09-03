declare type Track = Spotify.Track
// // declare interface SpotifyToken {
// //   accessToken: string
// //   refreshTOken: string
// //   expirationDate: Date
// // }

// declare type Country = CountryOpts | CountryCode

// declare type SpotifyImage = {
//   url: string
//   height?: number
//   width?: number
// }

// declare type Album = {
//   album_type: 'album' | 'single' | 'compilation'
//   total_tracks: number
//   available_markets: Country[]
//   external_urls: {
//     spotify: string
//   }
//   href: string
//   id: string
//   images: SpotifyImage[]
//   name: string
//   release_date: string
//   release_date_precision: 'year' | 'month' | 'day'
//   restrictions: {
//     reason: 'market' | 'product' | 'explicit'
//   }
//   type: 'album'
//   uri: string
//   artists: SimplifiedArtist[]
// }

// declare type SimplifiedArtist = {
//   external_urls: {
//     spotify: string
//   }
//   href: string
//   id: string
//   name: string
//   type: 'artist'
//   uri: string
// }

// declare type Artist = {
//   external_urls: {
//     spotify: string
//   }
//   followers: {
//     total: number
//   }
//   genres: string[]
//   href: string
//   id: string
//   images: SpotifyImage[]
//   name: string
//   popularity: number
//   type: 'artist'
//   uri: string
// }

// declare type Track = {
//   album: Album
//   artists: SimplifiedArtist[]
//   available_markets: Country[]
//   disc_number: number
//   duration_ms: number
//   explicit: boolean
//   external_ids?: {
//     iserver: string
//     ean: string
//     upc: string
//   }
//   external_urls: {
//     spotify: string
//   }
//   href: string
//   id: string
//   is_playable: boolean
//   restrictions?: {
//     reason: 'market' | 'product' | 'explicit'
//   }
//   name: string
//   popularity: number
//   preview_url?: string
//   track_number: number
//   type: 'track'
//   uri: string
//   is_local: boolean
// }

// interface SpotifyUserProfile {
//   country: string
//   display_name: string
//   email: string
//   explicit_content: {
//     filter_enabled: boolean
//     filter_locked: boolean
//   }
//   external_urls: { spotify: string }
//   followers: { href: string; total: number }
//   href: string
//   id: string
//   images: SpotifyImage[]
//   product: string
//   type: string
//   uri: string
// }
