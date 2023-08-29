import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

import { useLocation } from '../hooks/location'
import { useRegion } from '../hooks/region'
import { InvaderPin } from './invader-pin'

export function MapViewer() {
  useLocation()

  const { pins, region, setRegion, isZoomedIn } = useRegion()

  return (
    <MapView style={styles.map} initialRegion={region} onRegionChangeComplete={setRegion} showsUserLocation>
      {pins.map(pin => (
        <InvaderPin key={pin.name} pin={pin} isZoomedIn={isZoomedIn} />
      ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})
