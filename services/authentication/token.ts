import * as SecureStore from 'expo-secure-store'
import { useCallback, useState } from 'react'

export function useToken() {
  const [tokenValue, setTokenValue] = useState<string | null>(getToken())

  const setToken = useCallback((value: string | null) => {
    if (value === null) {
      SecureStore.deleteItemAsync('token').then(() => setTokenValue(null))
    } else {
      SecureStore.setItem('token', value)
      setTokenValue(value)
    }
  }, [])

  return { token: tokenValue, setToken }
}

export function getToken() {
  return SecureStore.getItem('token')
}
