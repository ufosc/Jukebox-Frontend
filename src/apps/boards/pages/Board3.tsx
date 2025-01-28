import { Clock, TracksPanel } from '../components'
import { DisplayPanel } from '../components/DisplayPanel'
import { Video } from '../components/Video/Video'
import './Board1.scss'

export const Board3 = () => {
  return (
    <div className="board board-3">
      <DisplayPanel>
        <Clock />
        <Video />
      </DisplayPanel>
      <TracksPanel />
    </div>
  )
}
