import { LinearGradient } from 'expo-linear-gradient'
import { ColorValue, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { colors } from '../../theme/colors'
import { Invader } from '../../types/invader'
import { useInvadersContext } from '../../hooks/use-invaders-context'
import { useInvaderStatuses } from '../../hooks/use-invader-statuses'
import { useMemo } from 'react'

type InvaderMarkerProps = {
  invader: Invader
  zoomLevel: number
}

export function InvaderMarker({ invader, zoomLevel }: InvaderMarkerProps) {
  const { setSelectedInvader } = useInvadersContext()
  const { getStatus } = useInvaderStatuses()

  const gradientColors: [ColorValue, ColorValue] = useMemo(() => {
    const { found, destroyed } = getStatus(invader.id)
    if (found) {
      return [colors.found.start, colors.found.end]
    }
    if (destroyed) {
      return [colors.destroyed.start, colors.destroyed.end]
    }
    return [colors.primary, colors.accent]
  }, [getStatus, invader.id])

  // Determine marker style based on zoom level
  const markerStyle = useMemo(() => {
    const isZoomedIn = zoomLevel >= 14 // Threshold for zoomed in view
    return isZoomedIn ? styles.marker : styles.markerSmall
  }, [zoomLevel])

  return (
    <Marker coordinate={invader} onPress={() => setSelectedInvader(invader)}>
      <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={markerStyle} />
    </Marker>
  )
}

const styles = StyleSheet.create({
  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  markerSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
})
