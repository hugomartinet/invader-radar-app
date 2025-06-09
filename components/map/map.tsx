import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { useRegion } from '../../hooks/use-region'
import { Drawer } from './drawer'
import { InvaderMarker } from './invader-marker'
import { useInvadersContext } from '../../hooks/use-invaders-context'
import { useInvaderStatuses } from '../../hooks/use-invader-statuses'

export function Map() {
  const { region, setRegion } = useRegion()
  const { invaders } = useInvadersContext()
  const { loadStatuses } = useInvaderStatuses()

  useEffect(() => {
    loadStatuses()
  }, [loadStatuses])

  return (
    <>
      <MapView style={styles.map} initialRegion={region} onRegionChangeComplete={setRegion} showsUserLocation>
        {invaders?.map(invader => (
          <InvaderMarker key={invader.id} invader={invader} />
        ))}
      </MapView>
      <Drawer />
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})
