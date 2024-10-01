/**
 * Inspiration:
 * https://codepen.io/shshaw/pen/vKzoLL?editors=0110
 */
import { useEffect, useState } from 'react'
import { useTime } from 'src/hooks'
import { sleep } from 'src/utils'
import './FlipClock.scss'

// ANIMATION IS WORK-IN-PROGRESS
export const FlipClock = () => {
  const { date, hours: currentHours, minutes: currentMinutes } = useTime()
  const [hours, setHours] = useState(currentHours)
  const [minutes, setMinutes] = useState(currentMinutes)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    // setFlip(true)
    setMinutes(currentMinutes)
    setHours(currentHours)

    // sleep(1000).then(() => setFlip(false))
  }, [date])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setFlip(true)
  //     sleep(1000).then(() => setFlip(false))
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div className={`flip-clock${(flip && ' flip') || ''}`}>
      <time dateTime={date.toLocaleDateString()}>
        <span className="flip-clock__hour">
          <span className="flip-clock__digit" data-value={hours[0]}>
            {hours[0]}
          </span>
          <span className="flip-clock__digit" data-value={hours[1]}>
            {hours[1]}
          </span>
        </span>
        <span className="flip-clock__colon">:</span>
        <span className="flip-clock__min">
          <span className="flip-clock__digit" data-value={minutes[0]}>
            {minutes[0]}
          </span>
          <span className="flip-clock__digit" data-value={minutes[1]}>
            {minutes[1]}
          </span>
        </span>
      </time>
    </div>
  )
}
