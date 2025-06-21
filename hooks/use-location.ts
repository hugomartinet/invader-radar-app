import { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { Region } from 'react-native-maps'

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null)

  const getLocationWithPermission = async (requestPermission = false) => {
    // Check or request permission
    const { status } = requestPermission
      ? await Location.requestForegroundPermissionsAsync()
      : await Location.getForegroundPermissionsAsync()

    setPermissionStatus(status)

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return false
    }

    // Get current location
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    })
    setLocation(currentLocation)
    return true
  }

  useEffect(() => {
    getLocationWithPermission()
  }, [])

  const requestPermission = async () => {
    return getLocationWithPermission(true)
  }

  const getUserRegion = (): Region | null => {
    if (!location) return null

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
  }

  return {
    location,
    errorMsg,
    permissionStatus,
    requestPermission,
    getUserRegion,
  }
}
