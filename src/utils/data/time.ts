/**
 * Convert millisecond timestamp to time tokens.
 */
export const parseDuration = (ms: number) => {
  if (ms < 0) ms = -ms
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    ms: Math.floor(ms) % 1000,
  }
}

const padZeros = (val: number, maxLength = 2) =>
  String(val).padStart(maxLength, '0')

export const formatDuration = (ms: number): string => {
  if (ms < 0) ms = -ms

  const time = parseDuration(ms)
  time.hours += time.days * 24
  time.ms = 0
  time.days = 0

  if (time.hours > 0) {
    return `${time.hours}:${padZeros(time.minutes)}:${padZeros(time.seconds)}`
  }

  return `${time.minutes}:${padZeros(time.seconds)}`
}

export const getHours = (date: Date) => {}
