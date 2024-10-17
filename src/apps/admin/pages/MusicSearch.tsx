import { useState, type ChangeEvent, type FormEvent } from 'react'
import { mockTrack } from 'src/mock'
import './MusicSearch.scss'
import { Track } from './Track'

const track = mockTrack
const trackArray = [track, track, track, track]
export const MusicSearch = () => {
  const [inputs, setInputs] = useState({ track: '', album: '', artist: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <div className="music-search-title">Spotify Search</div>
      <form className="music-search-form" onSubmit={handleSubmit}>
        <div className="music-search-row grid col-12">
          <div className="col-3">
            <input
              className="music-search-input"
              type="text"
              name="track"
              value={inputs.track || ''}
              onChange={handleChange}
              placeholder="Track Name"
            ></input>
          </div>
          <div className="col-3">
            <input
              className="music-search-input"
              type="text"
              name="album"
              value={inputs.album || ''}
              onChange={handleChange}
              placeholder="Album Name"
            ></input>
          </div>
          <div className="col-3">
            <input
              className="music-search-input"
              type="text"
              name="artist"
              value={inputs.artist || ''}
              onChange={handleChange}
              placeholder="Artist Name"
            ></input>
          </div>
          <div className="music-search-button-container col-2">
            <button className="music-search-button">Search Tracks</button>
          </div>
        </div>
      </form>
      <div className="result-container">
        <div className="music-search-title">Results</div>
        <div className="track-container">
          {trackArray.map((track) => {
            return <Track track={track} />
          })}
        </div>
      </div>
    </div>
  )
}
