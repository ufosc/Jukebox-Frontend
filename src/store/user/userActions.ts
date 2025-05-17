import { unwrapResult } from '@reduxjs/toolkit'
import { Network } from 'src/network'
import { store } from '../store'
import {
  thunkInitializeUser,
  thunkLoginUser,
  thunkLogoutUser,
  thunkUpdateLinks,
} from './userThunks'

const network = Network.getInstance()

/**
 * If the user token exists, will set logged in to true,
 * and will fetch user information.
 */
export const initializeUser = async () => {
  await store.dispatch(thunkInitializeUser())
}

/**
 * Login user, return token.
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
 * Send user to the google consent screen.
 */
export const loginUserWithGoogle = (returnPath: string) => {
  return network.loginWithOauth('google', returnPath)
}

export const handleUserOauthReturn = async () => {
  const res = await network.handleOauthReturn()
  if (!res.success) return res

  await initializeUser()
  return res
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

/**
 * Updates the connected Spotify account for a given user
 */
export const updateLinks = async () => {
  await store.dispatch(thunkUpdateLinks())
}
