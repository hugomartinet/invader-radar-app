import { useMemo, useState } from 'react'
import { Region } from 'react-native-maps'
import invadersData from '../assets/invaders.json'

export function useRegion(initalRegion: Region) {
  const [region, setRegion] = useState<Region>(initalRegion)

  const params = useMemo(
    () => ({
      minLat: region.latitude - region.latitudeDelta / 2,
      maxLat: region.latitude + region.latitudeDelta / 2,
      minLong: region.longitude - region.longitudeDelta / 2,
      maxLong: region.longitude + region.longitudeDelta / 2,
    }),
    [region]
  )

  const invaders = useMemo(() => {
    return invadersData
      .map(invader => ({
        id: invader.id,
        latitude: invader.coordinates.lat,
        longitude: invader.coordinates.long,
      }))
      .filter(
        invader =>
          invader.latitude >= params.minLat &&
          invader.latitude <= params.maxLat &&
          invader.longitude >= params.minLong &&
          invader.longitude <= params.maxLong
      )
  }, [params])

  return { invaders, region, setRegion }
}
