import { Slot } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/api'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Slot initialRouteName="/home" />
      </View>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
