import { useTime } from 'src/hooks'
import './Clock.scss'

export const Clock = () => {
  const { date, hours, minutes, amOrPm } = useTime()

  return (
    <div className="clock">
      <time dateTime={date.toLocaleTimeString()}>
        <span className="clock__hour">{hours}</span>
        <span className="clock__colon">:</span>
        <span className="clock__min">
          {minutes}
          &nbsp;
          {amOrPm}
        </span>
      </time>
    </div>
  )
}
