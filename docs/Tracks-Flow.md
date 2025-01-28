# Jukebox Track Queue Flow

## Terms

- **Aux**: An admin has the "aux" if music is currently playing through their spotify account

## Considerations

- Only the owner of a spotify account can transfer playback to their account (ie John Doe cannot arbitrarily transfer playback to Richard Roe's spotify account).

## Walkthrough

### User

0. Initialize user, set active jukebox
1. Fetch active track, next tracks
2. Subscribe for player updates, on update sync store

### Admin, with Aux

0. Start out same as user
1. Get list of jukebox links
2. Post active link, return link credentials
3. Initialize jukebox player, authenticate with spotify
