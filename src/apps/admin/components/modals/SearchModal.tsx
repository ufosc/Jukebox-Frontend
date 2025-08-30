import { useNavigate } from 'react-router-dom'

interface SearchModalProps {
  tracks: ITrackDetails[]
  searchQuery: {
    trackName: string
    albumName: string
    artistName: string
  }
  changeState: any
}

import { useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import { ViewArrow } from 'src/assets/Icons'
import { selectCurrentJukebox } from 'src/store'
import './Modal.scss'

export const SearchModal = ({
  tracks,
  searchQuery,
  changeState,
}: SearchModalProps) => {
  const network = ApiClient.getInstance()
  const currentJbx = useSelector(selectCurrentJukebox)

  const navigate = useNavigate()
  const searchRedirect = async () => {
    console.log('Clicked')
    const searchPath = '/dashboard/music/search'
    if (currentJbx) {
      const response = await network.searchTracks(
        currentJbx.id,
        searchQuery.trackName,
        searchQuery.albumName,
        searchQuery.artistName,
      )

      navigate(searchPath, {
        state: {
          searchedTracks: response,
          query: searchQuery,
          needSearch: false,
        },
      })
    }
    changeState(false)
  }

  return (
    <>
      <div className="modal modal__search">
        <div className="modal__search__track-list">
          {tracks.splice(0, 4).map((track, key) => (
            <div className="modal__search__track-list__item">
              <div className="modal__search__title">{track.name}</div>

              <div className="modal__search__information">
                <div className="modal__search__information__item">
                  {track.artists[0].name}
                  {track.artists.length > 1 ? <>...</> : <></>}
                </div>

                <div className="modal__search__information__album">
                  {track.album.name}
                </div>

                <div className="modal__search__information__detail">
                  {track.album.release_date.split('-')[0]}
                </div>

                <div className="modal__search__information_detail">
                  {track.explicit ? <>Explicit</> : <>Clean</>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {tracks.length > 0 ? (
          <div className="modal__search__more" onClick={searchRedirect}>
            View All
            <ViewArrow color={'color-primary'} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
