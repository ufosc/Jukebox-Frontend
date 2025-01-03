/**
 * Random int between min and max, inclusively.
 *
 * Source: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
export const getRandomNum = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomItem = <T = any>(array: T[]) => {
  const index = getRandomNum(0, array.length)
  return array[index]
}

/**
 * Random subset from array.
 *
 * Source: https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
 */
export const getRandomSample = <T = any>(array: T[], size?: number) => {
  const length = array.length
  if (!size) {
    size = getRandomNum(1, array.length)
  }

  for (let i = size; i--; ) {
    const index = getRandomNum(0, length)
    const temp = array[index]
    array[index] = array[i]
    array[i] = temp
  }

  return array.slice(0, size)
}
