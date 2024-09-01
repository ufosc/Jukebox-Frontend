import { useEffect, useState } from 'react'

import './Clock.scss'

export const Clock = () => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="clock">
      <time dateTime={date.toTimeString()}>
        <span className="clock__hour">
          {date
            .toLocaleTimeString([], {
              hour: 'numeric',
            })
            .replace(/AM|PM/, '')
            .trim()}
        </span>
        <span className="clock__colon">:</span>
        <span className="clock__min">
          {date.toLocaleTimeString('en-US', {
            minute: '2-digit',
          })}
          &nbsp;
          {date
            .toLocaleTimeString([], {
              hour: 'numeric',
            })
            .replace(/\d*/, '')
            .trim()
            .toLocaleLowerCase()}
        </span>
      </time>
    </div>
  )
}
