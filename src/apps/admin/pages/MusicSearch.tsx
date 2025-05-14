import { useState, type ChangeEvent, type FormEvent } from 'react'
import { TrackList } from 'src/components'
import './MusicSearch.scss'
import { Network } from 'src/network'
import { selectCurrentJukebox } from 'src/store'
import { useSelector } from 'react-redux'

export const MusicSearch = () => {
  const [inputs, setInputs] = useState({ track: '', album: '', artist: '' })
  const jukebox = useSelector(selectCurrentJukebox)
  const network = Network.getInstance()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    console.log(name)
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log(inputs)
    event.preventDefault()
    if(jukebox !== null)
      {
        console.log(inputs)
        const tracksResult = await network.getTracks(jukebox.id, inputs.track, inputs.album, inputs.artist)
        console.log(tracksResult)
      }else{
        console.log("Jukebox is not connected")
      }
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
          <TrackList tracks={[]} />
        </div>
      </div>
    </div>
  )
}
