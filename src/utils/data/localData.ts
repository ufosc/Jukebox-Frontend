/**
 * Use LocalStorage data.
 */
export const localDataFactory = <T>(key: string) => ({
  set: (data?: T | null) => {
    localStorage.setItem(key, JSON.stringify(data))
  },
  clear: () => {
    localStorage.removeItem(key)
  },
  get: (): T | null => {
    const data = localStorage.getItem(key)

    if (data) {
      return JSON.parse(data)
    } else {
      return null
    }
  },
})
