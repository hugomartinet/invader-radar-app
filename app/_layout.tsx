import { Slot } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { InvadersContextProvider } from '../hooks/use-invaders-context'

export default function App() {
  return (
    <InvadersContextProvider>
      <View style={styles.container}>
        <Slot />
      </View>
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
