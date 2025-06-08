import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useRegion } from '../../hooks/use-region'
import { InvaderMarker } from './invader-marker'
import { InvaderDrawer } from './invader-drawer'
import { Invader } from '../../types/invader'

const INITIAL_REGION = {
  latitude: 48.86,
  longitude: 2.34,
  latitudeDelta: 0.2,
  longitudeDelta: 0.1,
}

export function Map() {
  const { region, setRegion, invaders } = useRegion(INITIAL_REGION)
  const [selectedInvader, setSelectedInvader] = useState<Invader | null>(null)

  return (
    <>
      <MapView style={styles.map} initialRegion={region} onRegionChangeComplete={setRegion} showsUserLocation>
        {invaders?.map(invader => (
          <Marker key={invader.id} coordinate={invader} onPress={() => setSelectedInvader(invader)}>
            <InvaderMarker />
          </Marker>
        ))}
      </MapView>
      <InvaderDrawer invader={selectedInvader} onClose={() => setSelectedInvader(null)} />
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})
