import { mockTrack } from 'src/mock'
import { Clock } from '../components/Clock'

import { useSelector } from 'react-redux'
import { AudioPlayer } from 'src/audio'
import { selectUser } from 'src/store'
import './Board1.scss'

const Track = (props: { track: Track }) => {
  const { track } = props
  return (
    <li className="track-list__track">
      <span className="track-list__track__preview">
        <img src={track.preview_url} alt={track.name} />
      </span>
      <div className="track-list__track__name-group">
        <h3 className="track-list__track__name">{track.name}</h3>
        <span className="track-list__track__artists">
          {track.artists.map((artist) => artist.name).join(', ')}
        </span>
      </div>
      <span className="track-list__track__info track-list__track__rec-by">
        Alex Smith
      </span>
      <span className="track-list__track__info track-list__track__duration">
        03:45
      </span>
      <span className="track-list__track__info track-list__track__likes">
        5
      </span>
      <span className="track-list__track__info track-list__track__dislikes">
        0
      </span>
    </li>
  )
}

export const Board1 = () => {
  const track = mockTrack
  const userInfo = useSelector(selectUser)

  return (
    <div className="board board-1">
      <div className="board__col board__display">
        <div className="board__clock">
          <Clock />
        </div>
      </div>
      <div className="board__col board__tracks">
        <div className="board__currently-playing board__tracks__group">
          <h2 className="font-title--accent board__tracks__group__title">
            Currently Playing
          </h2>
          <div className="board__tracks__group__inner">
            <ol className="board__currently-playing__list track-list">
              <Track track={track} />
            </ol>
            <div className="board__currently-playing__player">
              {/* <AudioPlayer
                audio={track}
                isPlaying={false}
                next={() => {
                  throw new Error('Function not implemented.')
                }}
                previous={() => {
                  throw new Error('Function not implemented.')
                }}
                play={() => {
                  throw new Error('Function not implemented.')
                }}
                pause={() => {
                  throw new Error('Function not implemented.')
                }}
              /> */}
            </div>
          </div>
        </div>
        <div className="board__queue board__tracks__group">
          <h2 className="font-title--accent board__tracks__group__title">
            Up Next
          </h2>
          <div className="board__tracks__group__inner">
            <ol className="board__queue__list track-list track-list-offset">
              <Track track={track} />
              <Track track={track} />
              <Track track={track} />
              <Track track={track} />
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
