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
          colors={['#6b21a8', '#be185d', '#ef4444', '#f59e0b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
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
    backgroundColor: '#be185d',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#6b21a8',
  },
})
