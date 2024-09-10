import { useEffect, useState } from 'react'

export const useTime = (interval: number = 1000) => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return {
    date,
    hours: String(date.getHours()),
    minutes: String(date.getMinutes()).padStart(2, '0'),
    amOrPm: date
      .toLocaleTimeString([], {
        hour: 'numeric',
      })
      .replace(/\d*/, '')
      .trim()
      .toLocaleLowerCase() as 'am' | 'pm',
  }
}
