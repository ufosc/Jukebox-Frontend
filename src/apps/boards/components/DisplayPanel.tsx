import { Clock } from './Clock'

export const DisplayPanel = () => {
  return (
    <div className="board__col board__display">
      <div className="board__clock">
        <Clock />
      </div>
    </div>
  )
}
