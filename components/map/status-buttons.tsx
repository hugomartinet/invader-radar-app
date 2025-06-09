import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useInvaderStatuses } from '../../hooks/use-invader-statuses'
import { colors } from '../../theme/colors'
import { Invader } from '../../types/invader'

interface StatusButtonsProps {
  invader: Invader
}

export function StatusButtons({ invader }: StatusButtonsProps) {
  const { getStatus, updateStatus } = useInvaderStatuses()

  const { found, destroyed } = getStatus(invader.id)

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, !found && styles.inactiveButton]} onPress={() => updateStatus(invader.id, { found: !found })}>
        {found ? (
          <LinearGradient
            colors={[colors.found.start, colors.found.end]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <MaterialCommunityIcons name="eye" size={18} color={colors.white} />
            <Text style={[styles.buttonText, styles.activeText]}>FOUND</Text>
          </LinearGradient>
        ) : (
          <>
            <MaterialCommunityIcons name="eye" size={18} color={colors.darkGray} />
            <Text style={[styles.buttonText, styles.inactiveText]}>FOUND</Text>
          </>
        )}
      </Pressable>

      <Pressable
        style={[styles.button, !destroyed && styles.inactiveButton]}
        onPress={() => updateStatus(invader.id, { destroyed: !destroyed })}
      >
        {destroyed ? (
          <LinearGradient
            colors={[colors.destroyed.start, colors.destroyed.end]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <MaterialCommunityIcons name="skull" size={18} color={colors.white} />
            <Text style={[styles.buttonText, styles.activeText]}>DESTROYED</Text>
          </LinearGradient>
        ) : (
          <>
            <MaterialCommunityIcons name="skull" size={18} color={colors.darkGray} />
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
    borderColor: colors.lightGray,
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
    color: colors.darkGray,
  },
  activeText: {
    color: colors.white,
  },
})
