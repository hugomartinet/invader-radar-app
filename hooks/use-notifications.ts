import { useState, useEffect, useRef } from 'react'
import * as Notifications from 'expo-notifications'
import {
  requestNotificationPermissions,
  startBackgroundLocationMonitoring,
  stopBackgroundLocationMonitoring,
  isBackgroundLocationEnabled,
  checkProximityManually,
} from '../services/notifications'
import { useInvadersContext } from './use-invaders-context'

export function useNotifications() {
  const [notificationPermission, setNotificationPermission] = useState<boolean>(false)
  const [backgroundLocationEnabled, setBackgroundLocationEnabled] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()
  const { invaders } = useInvadersContext()

  // Request notification permissions
  const requestPermissions = async () => {
    setIsLoading(true)
    try {
      const granted = await requestNotificationPermissions()
      setNotificationPermission(granted)
      return granted
    } catch (error) {
      console.error('Error requesting notification permissions:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Start background location monitoring
  const startMonitoring = async () => {
    if (!notificationPermission) {
      console.log('Notification permission not granted')
      return false
    }

    setIsLoading(true)
    try {
      const success = await startBackgroundLocationMonitoring()
      setBackgroundLocationEnabled(success)
      return success
    } catch (error) {
      console.error('Error starting background monitoring:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Stop background location monitoring
  const stopMonitoring = async () => {
    setIsLoading(true)
    try {
      const success = await stopBackgroundLocationMonitoring()
      setBackgroundLocationEnabled(!success)
      return success
    } catch (error) {
      console.error('Error stopping background monitoring:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Manual proximity check
  const checkProximity = async () => {
    if (invaders.length === 0) return

    try {
      await checkProximityManually(invaders)
    } catch (error) {
      console.error('Error checking proximity:', error)
    }
  }

  // Check current status
  const checkStatus = async () => {
    try {
      const isEnabled = await isBackgroundLocationEnabled()
      setBackgroundLocationEnabled(isEnabled)
    } catch (error) {
      console.error('Error checking background location status:', error)
    }
  }

  // Handle notification responses
  const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    const data = response.notification.request.content.data
    if (data?.invaderId) {
      // You can navigate to the invader on the map here
      console.log('User tapped notification for invader:', data.invaderId)
    }
  }

  useEffect(() => {
    // Set up notification listeners
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse)

    // Check initial status
    checkStatus()

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current)
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  return {
    notificationPermission,
    backgroundLocationEnabled,
    isLoading,
    requestPermissions,
    startMonitoring,
    stopMonitoring,
    checkProximity,
    checkStatus,
  }
}
