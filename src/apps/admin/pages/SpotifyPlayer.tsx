import { AudioPlayer } from 'src/components/audio/AudioPlayer'
import { mockTrack } from 'src/mock'
import './SpotifyPlayer.scss'
import { SpotifyPlayerAccount } from './SpotifyPlayerAccount'
import { SpotifyPlayerDetail } from './SpotifyPlayerDetail'
import { SpotifyPlayerInfo } from './SpotifyPlayerInfo'
import { Track } from './Track'

const track = mockTrack
export const SpotifyPlayer = () => {
  return (
    <>
      <div className="spotify-player-title">Spotify Player</div>
      <div className="spotify-player-container grid">
        <div className="col-6 left-container">
          <div className="spotify-player-desc">
            <div className="spotify-song-title">Song</div>
            <div className="spotify-song-author">Author</div>
          </div>
          <div className="audio-container">
            <AudioPlayer />
          </div>
          <SpotifyPlayerInfo title="Track Info" />
          <div className="detail-container">
            <SpotifyPlayerDetail firstDetail="Explicit" secondDetail="False" />
            <SpotifyPlayerDetail
              firstDetail="Album"
              secondDetail="Example Album"
            />
            <SpotifyPlayerDetail
              firstDetail="Release Date"
              secondDetail="1987"
            />
          </div>
          <div className="detail-container">
            <SpotifyPlayerDetail
              firstDetail="Recommended By"
              secondDetail="Alex Smith"
            />
            <SpotifyPlayerDetail
              firstDetail="Liked By"
              secondDetail="John Doe, Jane Reed, John Doe, Jane Reed, John Doe, Jane Reed, John Doe"
            />
            <SpotifyPlayerDetail
              firstDetail="Disliked By"
              secondDetail="Bob Jones, Richard Travis, Bob Jones, Richard Travis"
            />
          </div>
          <div className="next-track-container">
            <SpotifyPlayerInfo title="Next Tracks" />
          </div>
          <Track track={track} />
          <Track track={track} />
        </div>
        <div className="col-5 right-container">
          <div className="session-container">
            <SpotifyPlayerInfo title="Session Info" />
            <div className="detail-container">
              <SpotifyPlayerDetail
                firstDetail="Active Device"
                secondDetail="John's MacBook Air"
              />
              <SpotifyPlayerDetail
                firstDetail="This Device"
                secondDetail="John's MacBook Air"
              />
            </div>
          </div>
          <SpotifyPlayerInfo title="Connected Spotify Accounts" />
          <div className="account-container">
            <SpotifyPlayerAccount
              profileImage="https://example.com"
              isActive={true}
              email="user@example.com"
            />
            <SpotifyPlayerAccount
              profileImage="https://example.com"
              isActive={false}
              email="user@example.com"
            />
          </div>
          <div className="connect-button-container">
            <button className="button-outlined connect-button">
              Connect New Account
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
