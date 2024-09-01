/**
 * Take in dynamic list of class names and format them as single string.
 */
export const mergeClassNames = (
  ...classNames: (string | undefined | null | boolean)[]
) => {
  return (
    classNames
      // .filter((name) => name != null && name != undefined)
      .filter((name) => name)
      .join(' ')
  )
}
