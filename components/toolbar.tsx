import { Text, View } from 'react-native'
import { useMapContext } from '../context/map'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import colors from 'tailwindcss/colors'
import { InvaderStatusPicker } from './invader-status-picker'

export function Toolbar() {
  const { selectedPin } = useMapContext()

  if (!selectedPin) return null

  return (
    <View className="absolute bottom-[20] left-[20] right-[20] h-[80px] flex flex-row items-center justify-center bg-white rounded-full pl-[32] pr-[16] shadow-lg">
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <View className="flex-1 justify-center">
            <Text className="text-[36px] font-bold bg-transparent">{selectedPin.name}</Text>
          </View>
        }
      >
        <LinearGradient
          className="flex-1 h-full"
          colors={[colors.red[500], colors.orange[500], colors.yellow[400]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </MaskedView>

      <InvaderStatusPicker selectedPin={selectedPin} />
    </View>
  )
}
