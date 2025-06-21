import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native'
import { colors } from '../../theme/colors'
import { StatusButtons } from './status-buttons'
import { useInvadersContext } from '../../hooks/use-invaders-context'
import React, { useEffect, useRef, useState } from 'react'

export function Drawer() {
  const { selectedInvader, setSelectedInvader } = useInvadersContext()
  const slideAnim = useRef(new Animated.Value(0))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (selectedInvader) {
      setIsVisible(true)
      // Slide up
      Animated.spring(slideAnim.current, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start()
    } else {
      // Slide down
      Animated.spring(slideAnim.current, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start(() => {
        // Only hide the component after animation completes
        setIsVisible(false)
      })
    }
  }, [selectedInvader])

  if (!isVisible) return null

  const translateY = slideAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  })

  const handleOverlayPress = () => {
    setSelectedInvader(null)
  }

  return (
    <>
      <Pressable style={styles.overlay} onPress={handleOverlayPress} />
      <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
        <View style={styles.backgroundExtension} />
        <View style={styles.content}>
          <MaskedView style={styles.titleContainer} maskElement={<Text style={styles.titleMask}>{selectedInvader?.id}</Text>}>
            <LinearGradient colors={[colors.primary, colors.accent]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
              <Text style={styles.title}>{selectedInvader?.id}</Text>
            </LinearGradient>
          </MaskedView>
          <Pressable onPress={() => setSelectedInvader(null)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        </View>
        {selectedInvader && <StatusButtons invader={selectedInvader} />}
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
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
    zIndex: 2,
  },
  backgroundExtension: {
    position: 'absolute',
    bottom: -100, // Extends 100 units below the drawer
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: colors.white,
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
