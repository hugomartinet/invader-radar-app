import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../theme/colors'
import { StatusButtons } from './status-buttons'
import { useInvadersContext } from '../../hooks/use-invaders-context'

export function Drawer() {
  const { selectedInvader, setSelectedInvader } = useInvadersContext()

  if (!selectedInvader) return null

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaskedView style={styles.titleContainer} maskElement={<Text style={styles.titleMask}>{selectedInvader.id}</Text>}>
          <LinearGradient colors={[colors.primary, colors.accent]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
            <Text style={styles.title}>{selectedInvader.id}</Text>
          </LinearGradient>
        </MaskedView>
        <Pressable onPress={() => setSelectedInvader(null)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </Pressable>
      </View>
      <StatusButtons invader={selectedInvader} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    height: 44,
  },
  titleMask: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.black,
  },
  gradient: {
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: 'transparent',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 26,
    color: '#999999',
    lineHeight: 26,
  },
})
