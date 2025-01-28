# Spotify Setup

> Spotify Access Token: <https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started>

## Dev Mode

To make development easier, it's possible to connect to spotify directly without running the Jukebox Server. Do the following to connect with spotify:

1. Copy `sample.env.dev` to `.env.dev`

   ```sh
   cp ./sample.env.dev ./.env.dev
   ```

2. Click on the Spotify Access Token [link](https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started) to generate a new access token. It will expire in 1h.
3. Enter the new token as the value to the `VITE_SPOTIFY_ACCESS_TOKEN` variable in the .env.dev file.
4. That's it!

## Network Mode

1. Copy `sample.env.network` to `.env.network`
2. Refer to this doc on setting up spotify for the Jukebox Server: <https://github.com/ufosc/Jukebox-Server/blob/main/docs/Spotify.md>. Put any environment variables in the new `.env.network` file.
3. Refer to this doc for setting up the rest of the models/objects: <https://github.com/ufosc/Jukebox-Server/blob/main/docs/Network-Mode.md>. All of the links should be the same.
