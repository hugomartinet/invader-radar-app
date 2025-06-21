import { useEffect, useMemo, useState } from 'react'
import { Region } from 'react-native-maps'
import invadersData from '../assets/invaders.json'
import { useInvadersContext } from './use-invaders-context'

const INITIAL_REGION = {
  latitude: 48.86,
  longitude: 2.34,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
}

export function useRegion() {
  const [region, setRegion] = useState<Region>(INITIAL_REGION)
  const { setInvaders } = useInvadersContext()

  const params = useMemo(
    () => ({
      minLat: region.latitude - region.latitudeDelta / 2,
      maxLat: region.latitude + region.latitudeDelta / 2,
      minLong: region.longitude - region.longitudeDelta / 2,
      maxLong: region.longitude + region.longitudeDelta / 2,
    }),
    [region]
  )

  useEffect(() => {
    const filteredInvaders = invadersData
      .filter(
        ({ coordinates }) =>
          coordinates.lat >= params.minLat &&
          coordinates.lat <= params.maxLat &&
          coordinates.long >= params.minLong &&
          coordinates.long <= params.maxLong
      )
      .map(invader => ({
        id: invader.id,
        latitude: invader.coordinates.lat,
        longitude: invader.coordinates.long,
      }))

    setInvaders(filteredInvaders)
  }, [params, setInvaders])

  return { region, setRegion }
}
