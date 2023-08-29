import { useEffect, useRef } from 'react'
import { Animated, Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text } from 'react-native'
import { useMapContext } from '../context/map'
import { TOOLBAR_HEIGHT, TOOLBAR_MARGIN } from './common'

export function FlashInvadersLink() {
  const { selectedPin } = useMapContext()

  const windowWidth = Dimensions.get('window').width
  const widthAnim = useRef(new Animated.Value(240)).current

  const compact = selectedPin !== null

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: compact ? TOOLBAR_HEIGHT : windowWidth - 2 * TOOLBAR_MARGIN,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [selectedPin])

  return (
    <Animated.View style={{ ...styles.container, width: widthAnim }}>
      <Pressable style={styles.button} onPress={() => {}}>
        <ImageBackground style={styles.backgroundImage} source={require('../assets/pixel-background.png')}>
          {compact && <Image style={styles.invaderImage} source={require('../assets/pixel-invader.png')} />}
          <Text style={styles.buttonText}>Ouvrir FlashInvaders</Text>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignSelf: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    borderRadius: TOOLBAR_HEIGHT / 4,
    overflow: 'hidden',
  },

  backgroundImage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  invaderImage: {
    height: TOOLBAR_HEIGHT,
    width: TOOLBAR_HEIGHT,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
})
