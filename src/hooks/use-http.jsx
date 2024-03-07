/**
 * Custom hook to handle http requests.
 */
import axios from 'axios'
import { useCallback, useState } from 'react'

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true)
    setError(null)
    try {
      let body = requestConfig.body ? requestConfig.body : null

      const response = await axios({
        method: requestConfig.method ? requestConfig.method : 'GET',
        url: requestConfig.url,
        headers: requestConfig.headers ? requestConfig.headers : {},
        data: body,
      })
        .then((res) => {
          console.log(res)
          return res
        })
        .catch((err) => {
          console.log('from axios: ', err)
          setError(err.message || 'Something went wrong!')
          // return applyData(err.response);
          // throw new Error(err);
          return err.response
        })

      if (response.status !== 200) {
        let message = response?.data?.message || 'Something went wrong!'
        console.log('from axios status check: ', message)
        throw new Error(message)
      }
      // setError(null);

      applyData(response)
    } catch (err) {
      console.log('from axios error catch: ', err)
      setError(err.message || 'Something went wrong!')

      throw new Error(err)
    }
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    sendRequest,
  }
}
