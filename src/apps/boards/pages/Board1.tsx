import { Clock, TracksPanel } from '../components'
import { DisplayPanel } from '../components/DisplayPanel'
import './Board1.scss'

export const Board1 = () => {
  return (
    <div className="board board-1">
      <DisplayPanel>
        <Clock />
      </DisplayPanel>
      <TracksPanel />
    </div>
  )
}
