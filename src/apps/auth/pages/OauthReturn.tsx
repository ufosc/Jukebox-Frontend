import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleUserOauthReturn } from 'src/store'

// TODO: Style this page
export const OauthReturn = () => {
  const navigate = useNavigate()

  useEffect(() => {
    handleUserOauthReturn().then((res) => {
      if (res.success) {
        navigate('/admin')
      } else {
        navigate('/auth/login')
      }
    })
  }, [])
  return <div>Redirecting...</div>
}
