import { useSelector } from 'react-redux'
import { TrackList } from 'src/components'
import { clearNextTracks, selectCurrentJukebox, selectCurrentMembership, selectNextTracks, selectUser } from 'src/store'
import './MusicQueue.scss'
import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'src/context'
import { TempList } from '../components/TempList'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
  const currentUser = useSelector(selectUser)
  const currentMembership = useSelector(selectCurrentMembership)
  
  const [currentContext, setCurrentContext] = useState({
    role: "admin",
    jukebox: currentJukebox,
  })

  useEffect(()=>{
    if(currentMembership && currentMembership.is_admin) {
      setCurrentContext(prev => ({
        ...prev,
        role: "admin"
      }))
    }else{
      setCurrentContext(prev => ({
        ...prev,
        role: "member"
      }))
    }
  }, [currentMembership])

  useEffect(()=>{
    console.log(currentUser)
  }, [])

  return (
    <>
    <div className="music-queue_container">
      <div className="next_up_container">
        <h1>Next Up</h1>
        <AdminContext.Provider value={currentContext}>
            <TrackList tracks={nextTracks} />
        </AdminContext.Provider>
      </div>
    </div>
    {/* 
    <AdminContext.Provider value={currentContext}>
      <TempList tracks={nextTracks}/>
    </AdminContext.Provider>
    */}
    </>
  )
}
