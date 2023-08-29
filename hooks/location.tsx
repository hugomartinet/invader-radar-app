import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    }

    requestLocation()
  }, [])

  return { location, error }
}
