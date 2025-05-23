import { useSelector } from 'react-redux'
import { TrackList } from 'src/components'
import { clearNextTracks, selectCurrentJukebox, selectNextTracks } from 'src/store'
import './MusicQueue.scss'
import { createContext, useContext } from 'react'
import { ThemeContext } from 'src/context'

export interface AdminContextType {
  role:string
  jukebox: IJukebox | null
}

export const AdminContext = createContext<AdminContextType>({
  role: 'user',
  jukebox: null
})

export const MusicQueue = () => {
  const nextTracks = useSelector(selectNextTracks)
  const currentJukebox = useSelector(selectCurrentJukebox)
  
  const currentContext = {
    role: "admin",
    jukebox: currentJukebox
  }

  return (
    <div className="music-queue_container">
      <div className="next_up_container">
        <h1>Next Up</h1>
        <AdminContext.Provider value={currentContext}>
          <TrackList tracks={nextTracks} />
        </AdminContext.Provider>
      </div>
      <button className="button-outlined" onClick={clearNextTracks}>
        Clear Queue
      </button>
    </div>
  )
}
