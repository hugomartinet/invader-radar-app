import { useMemo, useState } from 'react'
import { Region } from 'react-native-maps'
import { useAPIQuery } from '../services/api'
import { Invader } from '../types/invader'

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

  const { data: invaders } = useAPIQuery<Invader[]>({ url: '/invaders', params })

  return { invaders, region, setRegion }
}
