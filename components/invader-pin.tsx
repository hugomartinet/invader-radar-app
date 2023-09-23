import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'
import { useMapContext } from '../context/map'
import { Pin } from '../types/pin'
import colors from 'tailwindcss/colors'

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
          className="w-[10] h-[10] rounded-full border-[0.5px] border-pink-600"
          colors={[colors.red[500], colors.orange[400]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      ) : (
        <View className="w-[3] h-[3] rounded-full bg-red-500" />
      )}
    </Marker>
  )
}
