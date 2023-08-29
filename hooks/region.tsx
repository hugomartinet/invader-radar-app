import { useMemo, useState } from 'react'
import invaders from '../assets/invaders.json'
import { Region } from 'react-native-maps'

export function useRegion() {
  const [region, setRegion] = useState<Region>(INITIAL_REGION)

  const isZoomedIn = region.latitudeDelta < DELTA_THRESHOLD

  const pins = useMemo(() => {
    const minLat = region.latitude - region.latitudeDelta / 2
    const maxLat = region.latitude + region.latitudeDelta / 2
    const minLong = region.longitude - region.longitudeDelta / 2
    const maxLong = region.longitude + region.longitudeDelta / 2

    return invaders.filter(
      invader =>
        invader.coordinates.latitude > minLat &&
        invader.coordinates.latitude < maxLat &&
        invader.coordinates.longitude > minLong &&
        invader.coordinates.longitude < maxLong
    )
  }, [region])

  return { pins, region, setRegion, isZoomedIn }
}

const INITIAL_REGION = {
  latitude: 48.86,
  longitude: 2.34,
  latitudeDelta: 0.2,
  longitudeDelta: 0.1,
}

const DELTA_THRESHOLD = 0.03
