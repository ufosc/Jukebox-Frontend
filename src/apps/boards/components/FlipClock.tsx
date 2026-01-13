/**
 * Inspiration:
 * https://codepen.io/shshaw/pen/vKzoLL?editors=0110
 */
import { useEffect, useState } from 'react'
import { useTime } from 'src/hooks'
import './FlipClock.scss'

// ANIMATION IS WORK-IN-PROGRESS
export const FlipClock = () => {
  const { date, hours: currentHours, minutes: currentMinutes } = useTime()
  const [hour1, setHour1] = useState(currentHours[0])
  const [minute1, setMinute1] = useState(currentMinutes[0])
  const [hour2, setHour2] = useState(currentHours[1])
  const [minute2, setMinute2] = useState(currentMinutes[1])

  useEffect(() => {
    // console.log(hour1, hour2, minute1, minute2)

    if (currentMinutes[0] !== minute1) setMinute1(currentMinutes[0])
    if (currentMinutes[1] !== minute2) setMinute2(currentMinutes[1])
    if (currentHours[0] !== hour1) setHour1(currentHours[0])
    if (currentHours[1] !== hour2) setHour2(currentHours[1])
  }, [date])

  return (
    <div className="flip-clock-container">
      <div className={`flip-clock`}>
        <time dateTime={date.toLocaleDateString()}>
          <FlipPiece integer={+hour1} isFirst={false} />
          <FlipPiece integer={+hour2} isFirst={true} />
          <span className="flip-clock__colon">:</span>
          <FlipPiece integer={+minute1} isFirst={false} />
          <FlipPiece integer={+minute2} isFirst={true} />
        </time>
      </div>
    </div>
  )
}

const FlipPiece = (props: { integer: number; isFirst: boolean }) => {
  const { integer, isFirst } = props
  const [num, setNum] = useState(integer)
  const [isFlip, setIsFlip] = useState(false)

  useEffect(() => {
    // console.log(num)
    setIsFlip(true)
    setTimeout(() => {
      setNum(integer)
      setIsFlip(false)
    }, 300)
  }, [integer])
  return (
    <>
      <span className={`flip-clock__piece ${isFlip ? 'flip' : ''}`}>
        <span className="flip-clock__card card">
          <span className="card__top">{num}</span>
          <span className="card__bottom" data-value={num}></span>
          <span className="card__back" data-value={num}>
            <span className="card__bottom" data-value={num}></span>
          </span>
        </span>
      </span>
    </>
  )
}
