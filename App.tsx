import { InvadersContextProvider } from './hooks/use-invaders-context'
import { FiltersProvider } from './hooks/use-filters-context'
import { Map } from './components/map/map'
import { StyleSheet, View } from 'react-native'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'

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

export default function App() {
  useEffect(() => {
    // Initialize notification system
    const initializeNotifications = async () => {
      try {
        // Request permissions on app start
        const { status } = await Notifications.getPermissionsAsync()
        if (status !== 'granted') {
          console.log('Notification permissions not granted')
        }
      } catch (error) {
        console.error('Error initializing notifications:', error)
      }
    }

    initializeNotifications()
  }, [])

  return (
    <InvadersContextProvider>
      <FiltersProvider>
        <View style={styles.container}>
          <Map />
        </View>
      </FiltersProvider>
    </InvadersContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
