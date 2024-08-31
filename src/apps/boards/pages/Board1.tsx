import { mockTrack } from 'src/mock'
import { Clock } from '../components/Clock'

export const Board1 = () => {
  const track = mockTrack

  return (
    <div className="board board-1">
      <div className="board__col">
        <div className="board__clock">
          <Clock />
        </div>
      </div>
      <div className="board__col">
        <div className="board__currently-playing">
          <h2>Currently Playing</h2>
          <ol className="board__currently-playing__list">
            <li className="board__currently-playing__list__track">
              <span>{track.name}</span>
              <span>
                {track.artists.map((artist) => artist.name).join(', ')}
              </span>
              <span>Alex Smith</span>
              <span>03:45</span>
              <span>5</span>
              <span>0</span>
            </li>
          </ol>
          <div className="board__currently-playing__player"></div>
        </div>
        <div className="board__queue">
          <h2>Up Next</h2>
          <ol className="board__queue__list">
            <li className="board__queue__list__track">
              <span>{track.name}</span>
              <span>
                {track.artists.map((artist) => artist.name).join(', ')}
              </span>
              <span>Alex Smith</span>
              <span>03:45</span>
              <span>5</span>
              <span>0</span>
            </li>
            <li className="board__queue__list__track">
              <span>{track.name}</span>
              <span>
                {track.artists.map((artist) => artist.name).join(', ')}
              </span>
              <span>Alex Smith</span>
              <span>03:45</span>
              <span>5</span>
              <span>0</span>
            </li>
            <li className="board__queue__list__track">
              <span>{track.name}</span>
              <span>
                {track.artists.map((artist) => artist.name).join(', ')}
              </span>
              <span>Alex Smith</span>
              <span>03:45</span>
              <span>5</span>
              <span>0</span>
            </li>
            <li className="board__queue__list__track">
              <span>{track.name}</span>
              <span>
                {track.artists.map((artist) => artist.name).join(', ')}
              </span>
              <span>Alex Smith</span>
              <span>03:45</span>
              <span>5</span>
              <span>0</span>
            </li>
            <li className="board__queue__list__track">
              <span>{track.name}</span>
              <span>
                {track.artists.map((artist) => artist.name).join(', ')}
              </span>
              <span>Alex Smith</span>
              <span>03:45</span>
              <span>5</span>
              <span>0</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
