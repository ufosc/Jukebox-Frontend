import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ApiClient } from 'src/api'
import { TrackSearchList } from 'src/components/track-list/SearchTrackList'
import { selectCurrentJukebox } from 'src/store'
import './MusicSearch.scss'

export const MusicSearch = () => {
  const [inputs, setInputs] = useState({ track: '', album: '', artist: '' })
  const [tracks, setTracks] = useState<ITrack[]>([])
  const jukebox = useSelector(selectCurrentJukebox)
  const network = ApiClient.getInstance()

  const location = useLocation()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    console.log(name)
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log(inputs)
    event.preventDefault()
    if (jukebox !== null) {
      console.log(inputs)
      const tracksResult = await network.searchTracks(
        jukebox.id,
        inputs.track,
        inputs.album,
        inputs.artist,
      )
      console.log(tracksResult)
      if (tracksResult.success) {
        console.log(tracksResult.data.tracks)
        setTracks(tracksResult.data.tracks)
      }
    } else {
      console.log('Jukebox is not connected')
    }
  }

  useEffect(() => {
    if (location.state && location.state.query && location.state.needSearch) {
      console.log('HEEEI')
      setTracks(location.state.searchedTracks.data.tracks.items)
      setInputs({
        track: location.state.query.trackName,
        album: location.state.query.albumName,
        artist: location.state.query.artistName,
      })
      return
    }
    //If no additional API calls are needed
    else if (location.state && location.state.query) {
      console.log('HII')
      setTracks(location.state.searchedTracks.data.tracks.items)
      setInputs({
        track: location.state.query.trackName,
        album: location.state.query.albumName,
        artist: location.state.query.artistName,
      })
      return
    }
  }, [location.state])

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
          <TrackSearchList tracks={tracks} />
        </div>
      </div>
    </div>
  )
}
