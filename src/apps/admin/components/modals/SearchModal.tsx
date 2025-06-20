interface SearchModalProps {
  tracks: ITrackDetails[]
}

import './Modal.scss'

export const SearchModal = ({ tracks }: SearchModalProps) => {
  return (
    <>
      <div className="modal modal__search">
        <div className='modal__search__track-list'>
          {tracks.splice(0, 4).map((track, key) => (
            <div className="modal__search__track-list__item">
              <div className='modal__search__title'>
                {track.name}
              </div>

              <div>
                {track.album.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
