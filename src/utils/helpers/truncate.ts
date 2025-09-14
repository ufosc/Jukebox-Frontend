export const truncate = (target: string, maxLength: number) => {
  if (target.length <= maxLength) return target
  return target.substring(0, maxLength) + '...'
}
