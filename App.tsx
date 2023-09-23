import { View } from 'react-native'
import { MapViewer } from './components/map-viewer'
import { Toolbar } from './components/toolbar'
import { MapContextProvider } from './context/map'

export default function App() {
  return (
    <MapContextProvider>
      <View className="flex-1">
        <MapViewer />
        <Toolbar />
      </View>
    </MapContextProvider>
  )
}
