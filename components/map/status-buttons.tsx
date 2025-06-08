import React from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import { colors } from '../../theme/colors'
import { useInvaderStatus } from '../../hooks/use-invader-status'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

type StatusButtonsProps = {
  invaderId: string
}

export function StatusButtons({ invaderId }: StatusButtonsProps) {
  const { updateState, getState } = useInvaderStatus()
  const { found, destroyed } = getState(invaderId)

  const toggleFound = () => {
    updateState(invaderId, { found: !found })
  }

  const toggleDestroyed = () => {
    updateState(invaderId, { destroyed: !destroyed })
  }

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, !found && styles.inactiveButton]} onPress={toggleFound}>
        {found ? (
          <LinearGradient
            colors={[colors.found.start, colors.found.end]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <MaterialCommunityIcons name="eye" size={18} color="#FFFFFF" />
            <Text style={[styles.buttonText, styles.activeText]}>FOUND</Text>
          </LinearGradient>
        ) : (
          <>
            <MaterialCommunityIcons name="eye" size={18} color="#BDBDBD" />
            <Text style={[styles.buttonText, styles.inactiveText]}>FOUND</Text>
          </>
        )}
      </Pressable>

      <Pressable style={[styles.button, !destroyed && styles.inactiveButton]} onPress={toggleDestroyed}>
        {destroyed ? (
          <LinearGradient
            colors={[colors.destroyed.start, colors.destroyed.end]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <MaterialCommunityIcons name="skull" size={18} color="#FFFFFF" />
            <Text style={[styles.buttonText, styles.activeText]}>DESTROYED</Text>
          </LinearGradient>
        ) : (
          <>
            <MaterialCommunityIcons name="skull" size={18} color="#BDBDBD" />
            <Text style={[styles.buttonText, styles.inactiveText]}>DESTROYED</Text>
          </>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 28,
    paddingBottom: 32,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    gap: 6,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  inactiveButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -1,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  inactiveText: {
    color: '#BDBDBD',
  },
  activeText: {
    color: '#FFFFFF',
  },
})
