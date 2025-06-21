import { InvadersContextProvider } from './hooks/use-invaders-context'
import { FiltersProvider } from './hooks/use-filters-context'
import { Map } from './components/map/map'
import { StyleSheet, View } from 'react-native'

export default function App() {
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
