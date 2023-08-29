import { StyleSheet, View } from 'react-native'
import { FlashInvadersLink } from './flash-invaders-link'
import { TOOLBAR_HEIGHT, TOOLBAR_MARGIN } from './common'

export function Toolbar() {
  return (
    <View style={styles.container}>
      <FlashInvadersLink />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: TOOLBAR_MARGIN,
    left: TOOLBAR_MARGIN,
    right: TOOLBAR_MARGIN,

    height: TOOLBAR_HEIGHT,
  },
})
