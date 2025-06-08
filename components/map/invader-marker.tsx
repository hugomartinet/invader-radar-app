import { ColorValue, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../../theme/colors'
import { useInvaderStatus } from '../../hooks/use-invader-status'

type InvaderMarkerProps = {
  invaderId: string
}

export function InvaderMarker({ invaderId }: InvaderMarkerProps) {
  const { states } = useInvaderStatus()
  const state = states[invaderId] || { found: false, destroyed: false }
  const { found, destroyed } = state

  const getGradientColors = (): [ColorValue, ColorValue] => {
    if (found) {
      return [colors.found.start, colors.found.end]
    }
    if (destroyed) {
      return [colors.destroyed.start, colors.destroyed.end]
    }
    return [colors.primary, colors.accent]
  }

  // Create a unique key that changes when the status changes
  const markerKey = `${invaderId}-${found}-${destroyed}`

  return (
    <View key={markerKey} style={styles.container}>
      <LinearGradient colors={getGradientColors()} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.marker} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
})
