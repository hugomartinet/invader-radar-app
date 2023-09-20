import { StyleSheet, View } from 'react-native'
import { MapViewer } from './components/map-viewer'
import { MapContextProvider } from './context/map'

export default function App() {
  return (
    <MapContextProvider>
      <View style={styles.container}>
        <MapViewer />
      </View>
    </MapContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
