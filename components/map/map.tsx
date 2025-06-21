import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { useRegion } from '../../hooks/use-region'
import { useLocation } from '../../hooks/use-location'
import { Drawer } from './drawer'
import { InvaderMarker } from './invader-marker'
import { LocationButton } from './location-button'
import { FilterButton } from './filter-button'
import { useInvadersContext } from '../../hooks/use-invaders-context'
import { useInvaderStatuses } from '../../hooks/use-invader-statuses'
import { useFiltersContext } from '../../hooks/use-filters-context'

export function Map() {
  const { region, setRegion } = useRegion()
  const { location, getUserRegion } = useLocation()
  const { invaders } = useInvadersContext()
  const { loadStatuses, getStatus } = useInvaderStatuses()
  const { filters } = useFiltersContext()
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

  // Calculate zoom level from region delta
  const zoomLevel = Math.log2(360 / region.longitudeDelta)

  // Filter invaders based on status and filter settings
  const filteredInvaders = invaders?.filter(invader => {
    const { found, destroyed } = getStatus(invader.id)

    // Show invader if it matches any of the active filters
    if (found && filters.showFound) return true
    if (destroyed && filters.showDestroyed) return true
    if (!found && !destroyed) return true // Always show unfound/undestroyed invaders

    return false
  })

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
        {filteredInvaders?.map(invader => (
          <InvaderMarker key={invader.id} invader={invader} zoomLevel={zoomLevel} />
        ))}
      </MapView>
      <LocationButton onPress={handleLocationPress} />
      <FilterButton />
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
