import * as Notifications from 'expo-notifications'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Invader } from '../types/invader'

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

const BACKGROUND_LOCATION_TASK = 'background-location-task'
const PROXIMITY_DISTANCE = 50 // meters - distance to trigger notification
const INVADERS_STORAGE_KEY = 'invaders_data'
const NOTIFIED_INVADERS_KEY = 'notified_invaders'

// Background task for location monitoring
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error('Background location task error:', error)
    return
  }

  const { locations } = data as { locations: Location.LocationObject[] }
  if (locations && locations.length > 0) {
    const currentLocation = locations[0]
    await checkProximityToInvaders(currentLocation)
  }
})

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

// Get invaders from storage
async function getInvadersFromStorage(): Promise<Invader[]> {
  try {
    const invadersData = await AsyncStorage.getItem(INVADERS_STORAGE_KEY)
    return invadersData ? JSON.parse(invadersData) : []
  } catch (error) {
    console.error('Error getting invaders from storage:', error)
    return []
  }
}

// Get notified invaders from storage
async function getNotifiedInvaders(): Promise<Set<string>> {
  try {
    const notifiedData = await AsyncStorage.getItem(NOTIFIED_INVADERS_KEY)
    return notifiedData ? new Set(JSON.parse(notifiedData)) : new Set()
  } catch (error) {
    console.error('Error getting notified invaders:', error)
    return new Set()
  }
}

// Save notified invaders to storage
async function saveNotifiedInvaders(notifiedInvaders: Set<string>) {
  try {
    await AsyncStorage.setItem(NOTIFIED_INVADERS_KEY, JSON.stringify([...notifiedInvaders]))
  } catch (error) {
    console.error('Error saving notified invaders:', error)
  }
}

// Check if user is near any invaders
async function checkProximityToInvaders(userLocation: Location.LocationObject) {
  try {
    const invaders = await getInvadersFromStorage()
    const notifiedInvaders = await getNotifiedInvaders()

    for (const invader of invaders) {
      const distance = calculateDistance(userLocation.coords.latitude, userLocation.coords.longitude, invader.latitude, invader.longitude)

      if (distance <= PROXIMITY_DISTANCE) {
        // Check if we haven't already notified for this invader recently
        const notificationKey = `${invader.id}_${Date.now()}`
        if (!notifiedInvaders.has(invader.id)) {
          await sendProximityNotification(invader, distance)
          notifiedInvaders.add(invader.id)
          await saveNotifiedInvaders(notifiedInvaders)

          // Remove from notified list after 1 hour to allow re-notification
          setTimeout(async () => {
            const currentNotified = await getNotifiedInvaders()
            currentNotified.delete(invader.id)
            await saveNotifiedInvaders(currentNotified)
          }, 60 * 60 * 1000) // 1 hour
        }
      }
    }
  } catch (error) {
    console.error('Error checking proximity:', error)
  }
}

// Send notification when near an invader
async function sendProximityNotification(invader: Invader, distance: number) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: '🚀 Invader Nearby!',
      body: `You're ${Math.round(distance)}m away from Invader #${invader.id}`,
      data: { invaderId: invader.id, distance },
    },
    trigger: null, // Send immediately
  })

  return notificationId
}

// Save invaders to storage for background task access
export async function saveInvadersToStorage(invaders: Invader[]) {
  try {
    await AsyncStorage.setItem(INVADERS_STORAGE_KEY, JSON.stringify(invaders))
  } catch (error) {
    console.error('Error saving invaders to storage:', error)
  }
}

// Request notification permissions
export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    console.log('Notification permission not granted')
    return false
  }

  return true
}

// Start background location monitoring
export async function startBackgroundLocationMonitoring() {
  try {
    // Request background location permission
    const { status } = await Location.requestBackgroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Background location permission not granted')
      return false
    }

    // Start background location updates
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 30000, // 30 seconds
      distanceInterval: 50, // 50 meters
      foregroundService: {
        notificationTitle: 'Invader Radar',
        notificationBody: 'Monitoring for nearby invaders',
      },
    })

    return true
  } catch (error) {
    console.error('Error starting background location monitoring:', error)
    return false
  }
}

// Stop background location monitoring
export async function stopBackgroundLocationMonitoring() {
  try {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
    return true
  } catch (error) {
    console.error('Error stopping background location monitoring:', error)
    return false
  }
}

// Check if background location is enabled
export async function isBackgroundLocationEnabled() {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK)
    return isRegistered
  } catch (error) {
    console.error('Error checking background location status:', error)
    return false
  }
}

// Manual proximity check (for when app is in foreground)
export async function checkProximityManually(invaders: Invader[]) {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    })

    for (const invader of invaders) {
      const distance = calculateDistance(location.coords.latitude, location.coords.longitude, invader.latitude, invader.longitude)

      if (distance <= PROXIMITY_DISTANCE) {
        await sendProximityNotification(invader, distance)
      }
    }
  } catch (error) {
    console.error('Error in manual proximity check:', error)
  }
}
