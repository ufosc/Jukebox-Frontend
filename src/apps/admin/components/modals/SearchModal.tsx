interface SearchModalProps {
  tracks: ITrackDetails[]
}

import { ViewArrow } from 'src/assets/Icons'
import './Modal.scss'

export const SearchModal = ({ tracks }: SearchModalProps) => {
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
        {tracks.length > 0 ?(<div className="modal__search__more">
            View All
            <ViewArrow color={'color-primary'} />
          </div>): (<></>)}
      </div>
    </>
  )
}
