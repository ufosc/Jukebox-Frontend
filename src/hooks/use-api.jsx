/**
 * Custom hook to fetch data from API.
 */
import { useCallback, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useHttp } from './use-http'

const API_BASE = 'http://localhost:8000'

export const useApi = () => {
  const [online, setOnline] = useState(false)
  const { isLoading, error, sendRequest } = useHttp()
  const [, setCookie] = useCookies(['token'])

  // const checkOnline = useCallback(async () => {
  //   try {
  //     await sendRequest(
  //       {
  //         url: API_BASE,
  //       },
  //       (res) => {
  //         if (!res) throw new Error('No response from server.')
  //         if (error) throw new Error(error)

  //         setOnline(true)
  //       },
  //     ).catch((err) => {
  //       setOnline(false)
  //       throw new Error(err)
  //     })
  //     if (error) throw new Error(error)

  //     // setOnline(true);
  //   } catch (err) {
  //     setOnline(false)
  //     console.log('err from api catch: ', err)
  //   }
  // }, [error, sendRequest])

  const login = useCallback(
    async (username, password) => {
      try {
        await sendRequest(
          {
            url: `${API_BASE}/api/user/login`,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              username: username,
              password: password,
            },
          },
          (res) => {
            console.log('api response: ', res)
            if (!res) throw new Error('No response from server.')

            setCookie('token', res.data.token, { path: '/' })

            return res
          },
        ).catch((err) => {
          console.error('error from api: ', err)
          throw new Error(err)
        })
        return true
      } catch (err) {
        console.error(err)
        return false
      }
    },
    [sendRequest, setCookie],
  )

  const register = useCallback(
    async (username, password) => {
      try {
        const responseData = await sendRequest({
          url: `${API_BASE}/api/user/register`,
          method: 'POST',
          body: {
            username,
            password,
          },
        })
        console.log(responseData)
      } catch (err) {
        console.log(err)
      }
    },
    [sendRequest],
  )

  return {
    isLoading,
    error,
    online,
    login: login,
    register: register,
  }
}
