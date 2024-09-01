export const isUser = (user: any): user is IUser => {
  if (user && 'name' in user && 'email' in user) {
    return true
  }
  return false
}
