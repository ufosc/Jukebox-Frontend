import { unwrapResult } from '@reduxjs/toolkit'
import { store } from '../store'
import {
  thunkInitializeUser,
  thunkLoginUser,
  thunkLogoutUser,
} from './userThunks'

export const initializeUser = async () => {
  await store.dispatch(thunkInitializeUser())
}

/**
 * Login user, return token
 */
export const loginUser = async (usernameOrEmail: string, password: string) => {
  return await store
    .dispatch(thunkLoginUser({ username: usernameOrEmail, password }))
    .then(unwrapResult)
    .then(async (res) => {
      if (res.success) {
        await initializeUser()
      }
      return res
    })
}

/**
 * Register user, needs work!!!
 */
export const registerUser = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string,
): Promise<{ success: boolean } & { [key: string]: any }> => {
  if (password === confirmPassword) {
    console.log(
      `Registration successful - ${email}, ${firstName}, ${lastName}, ${password}, ${confirmPassword}`,
    )
    return {
      success: true,
    }
  }
  console.log('Registration failed')
  return {
    success: false,
  }
}

/**
 * Clear user auth data from browser,
 * perform any server actions if necessary.
 */
export const logoutUser = async () => {
  await store.dispatch(thunkLogoutUser())
}
