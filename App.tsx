import { InvadersContextProvider } from './hooks/use-invaders-context'
import { Map } from './components/map/map'
import { StyleSheet, View } from 'react-native'

export default function App() {
  return (
    <InvadersContextProvider>
      <View style={styles.container}>
        <Map />
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
