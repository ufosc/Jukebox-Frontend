import { useEffect, useState } from 'react'
import { useTime } from 'src/hooks'

export const FlipClock = () => {
  const { date, hours: currentHours, minutes: currentMinutes } = useTime()
  const [hours, setHours] = useState(currentHours)
  const [minutes, setMinutes] = useState(currentMinutes)

  useEffect(() => {}, [date])

  return (
    <div className="flip-clock">
      <time dateTime={date.toLocaleDateString()}>
        <span className="flip-clock__hour">
          <span className="flip-clock__digit">{hours[0]}</span>
          <span className="flip-clock__digit">{hours[1]}</span>
        </span>
        <span className="flip-clock__colon">:</span>
        <span className="flip-clock__min">
          <span className="flip-clock__digit">{minutes[0]}</span>
          <span className="flip-clock__digit">{minutes[1]}</span>
        </span>
      </time>
    </div>
  )
}
