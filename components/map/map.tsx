import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { useRegion } from '../../hooks/use-region'
import { useLocation } from '../../hooks/use-location'
import { Drawer } from './drawer'
import { InvaderMarker } from './invader-marker'
import { LocationButton } from './location-button'
import { useInvadersContext } from '../../hooks/use-invaders-context'
import { useInvaderStatuses } from '../../hooks/use-invader-statuses'

export function Map() {
  const { region, setRegion } = useRegion()
  const { location, getUserRegion } = useLocation()
  const { invaders } = useInvadersContext()
  const { loadStatuses } = useInvaderStatuses()
  const mapRef = useRef<MapView>(null)
  const [hasAutoCentered, setHasAutoCentered] = useState(false)

  useEffect(() => {
    loadStatuses()
  }, [loadStatuses])

  // Auto-center on user location only once when first available
  useEffect(() => {
    if (location && mapRef.current && !hasAutoCentered) {
      const userRegion = getUserRegion()
      if (userRegion) {
        mapRef.current.animateToRegion(userRegion, 1000)
        setHasAutoCentered(true)
      }
    }
  }, [location, getUserRegion, hasAutoCentered])

  const handleLocationPress = () => {
    const userRegion = getUserRegion()
    if (userRegion && mapRef.current) {
      mapRef.current.animateToRegion(userRegion, 1000)
    }
  }

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {invaders?.map(invader => (
          <InvaderMarker key={invader.id} invader={invader} />
        ))}
      </MapView>
      <LocationButton onPress={handleLocationPress} />
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
