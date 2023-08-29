import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'
import { Marker } from 'react-native-maps'
import { useMapContext } from '../context/map'
import { Pin } from '../types/pin'

interface InvaderPinProps {
  pin: Pin
  isZoomedIn: boolean
}

export function InvaderPin({ pin, isZoomedIn }: InvaderPinProps) {
  const { setSelectedPin } = useMapContext()

  return (
    <Marker title={pin.name} coordinate={pin.coordinates} onSelect={() => setSelectedPin(pin)} onDeselect={() => setSelectedPin(null)}>
      {isZoomedIn ? (
        <LinearGradient
          colors={['#6a2d89', '#ff3838', '#ff7514', '#ffb800']}
          start={{ x: 0.45, y: 0 }}
          end={{ x: 0.55, y: 1 }}
          style={styles.circle}
        />
      ) : (
        <View style={styles.dot} />
      )}
    </Marker>
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#400c78',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#400c78',
  },
})
