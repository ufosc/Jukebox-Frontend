import { DisplayPanel, FlipClock, TracksPanel } from '../components'

export const Board2 = () => {
  return (
    <div className="board board-2">
      <DisplayPanel>
        <FlipClock />
      </DisplayPanel>
      <TracksPanel />
    </div>
  )
}
