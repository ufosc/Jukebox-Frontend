# Jukebox Project Overview

The main goal of Jukebox is to allow clubs and groups to have more interactivity around playing music.

- [Concepts and Models](#concepts-and-models)
- [User Flows](#user-flows)
  - [Admin Users](#admin-users)
  - [New Club Member](#new-club-member)
  - [Returning Club Member](#returning-club-member)
- [Future Features](#future-features)
  - [Player Modes](#player-modes)
    - [Chill Mode](#chill-mode)
    - [Party Mode](#party-mode)

## Concepts and Models

- A **Track** is spotify's terminology for a song. They use the more generic form since their api can return podcasts and such as well. We stuck to this terminology for consistency.
- A **Jukebox** is an object that stores music player information for a club (like how in the real world, a local bar would own a "jukebox" that plays music)
- When an admin has the **Aux**, music is playing from their computer with Jukebox. (like when someone used to connect a speaker's aux cord to their phone/ipod/portable player so the speaker would play their music)
- A **Jukebox Link** is an object that connects a music app's account to the jukebox. In practice, this represents the connection between Spotify and a Jukebox. They do NOT contain credentials for authenticating with spotify. Since this is abstracted away from the actual music app, it indicates which app it refers to (right now, just "spotify")
- A **Spotify Account** is the object that stores authentication-related info for spotify. If Apple Music were implemented with the system, then there would be a second model called `AppleMusicAccount`, since it may need different information.

## User Flows

### Admin Users

If the owner of a group wants to use Jukebox for their group, they would do the following steps:

1. Register a new User account, if necessary
2. Register a new Club account
3. Create a new Jukebox for that club \*
4. Link their spotify account with the new jukebox
5. Invite users (either directly, or by displaying a QR code)

_\* This may be automatic in the future_

### New Club Member

A user joins a group that has Jukebox, this is how they would queue up a track (assume guest, not authenticated, user):

1. The user would either click on a link sent to them, scan a qr code, or type in a member code (all would effectively do the same)
2. They are then directed to the "Members" page for the Jukebox, where they can view the player (if allowed in admin settings)
3. When they click on "Search", they can search up a track and queue it up.
4. _Optionally_, the user can click a link at the top to login/register.
5. If they were to click register, they would be directed to a registration form.
   1. On submission, a new user is created. That user is then added to the club of origin.
   2. They are then redirected back to the members page and are automatically authenticated.
6. If they were to click login, they would be directed to a login page.
   1. On submission, they are redirected back to the jukebox members page.

### Returning Club Member

If a user already created an account with the club, they would do these steps:

1. The user would either click on a link sent to them, scan a qr code, or type in a member code (all would effectively do the same)
2. They are then directed to the "Members" page for the Jukebox, where they can view the player
3. When they click on "Search", they can search up a track and queue it up.

## Future Features

### Player Modes

The following is a description of future features that need to be implemented.

#### Chill Mode

By default, once a club has created a Jukebox and at least one admin has connected their Spotify account, they can play music through the jukebox player at any time, and club members at any time can interact with that music. In this mode, guest users are (optionally) allowed to queue up tracks, but they are rate limited to 1 track per x minutes, defined in the Jukebox Settings.

The use case for this mode is long-duration sessions between smaller groups, or if the music is just soft background noise.

#### Party Mode

In party mode, the music is a more central focus, and more people are able to queue up songs. Since more people are allowed, points are used to restrict how many songs an individual person queues up - allowing more people to queue up tracks. All users might have some form of rate limit, they might be able to override this limit by paying a certain amount of tokens.
