export const isUser = (user: any): user is IUser => {
  if ('email' in user) {
    return true
  }
  return false
}
