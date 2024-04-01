import { PropsWithChildren, useEffect } from 'react'
import { useToken } from '../../services/authentication/token'
import { router } from 'expo-router'

export function AuthenticatedPage({ children }: PropsWithChildren) {
  const { token } = useToken()

  useEffect(() => {
    if (!token) router.replace('/login')
  }, [token])

  return children
}
