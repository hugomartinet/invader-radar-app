import React from 'react'
import { TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNotifications } from '../../hooks/use-notifications'
import { colors } from '../../theme/colors'

export function NotificationButton() {
  const { notificationPermission, backgroundLocationEnabled, isLoading, requestPermissions, startMonitoring, stopMonitoring } =
    useNotifications()

  const isActive = notificationPermission && backgroundLocationEnabled

  const handlePress = async () => {
    if (!notificationPermission) {
      const granted = await requestPermissions()
      if (granted) {
        const success = await startMonitoring()
        if (success) {
          Alert.alert('Notifications Enabled', 'You will now receive notifications when near invaders!', [{ text: 'OK' }])
        } else {
          Alert.alert('Failed to Enable', 'Please make sure you have granted all necessary permissions.', [{ text: 'OK' }])
        }
      } else {
        Alert.alert('Permission Denied', 'Please enable notifications in your device settings.', [{ text: 'OK' }])
      }
      return
    }

    if (isActive) {
      await stopMonitoring()
      Alert.alert('Notifications Disabled', 'You will no longer receive proximity notifications.', [{ text: 'OK' }])
    } else {
      const success = await startMonitoring()
      if (success) {
        Alert.alert('Notifications Enabled', 'You will now receive notifications when near invaders!', [{ text: 'OK' }])
      } else {
        Alert.alert('Failed to Enable', 'Please make sure you have granted all necessary permissions.', [{ text: 'OK' }])
      }
    }
  }

  return (
    <TouchableOpacity style={[styles.button, !isActive && styles.buttonDisabled]} onPress={handlePress} disabled={isLoading}>
      <Ionicons name={isActive ? 'notifications' : 'notifications-off'} size={20} color={colors.darkGray} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 180, // Below the filter button
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
