import { useEffect, useState } from 'react'

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
      <div>{date.toLocaleTimeString()}.</div>
    </div>
  )
}
