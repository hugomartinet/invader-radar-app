import React from 'react'
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { useLocation } from '../../hooks/use-location'
import { colors } from '../../theme/colors'

interface LocationButtonProps {
  onPress: () => void
}

export function LocationButton({ onPress }: LocationButtonProps) {
  const { permissionStatus, requestPermission, location } = useLocation()

  const handlePress = async () => {
    if (permissionStatus !== 'granted') {
      const granted = await requestPermission()
      if (!granted) return
    }
    onPress()
  }

  const isLoading = permissionStatus === 'granted' && !location
  const isAvailable = !!location && permissionStatus === 'granted'

  return (
    <TouchableOpacity style={[styles.button, !isAvailable && styles.buttonDisabled]} onPress={handlePress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.darkGray} />
      ) : (
        <FontAwesome6 name="location-arrow" size={20} color={colors.darkGray} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 3,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
})
