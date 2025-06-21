import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, Pressable } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../../theme/colors'
import { useFiltersContext } from '../../hooks/use-filters-context'

export function FilterButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { filters, toggleFilter } = useFiltersContext()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleFilterToggle = (filterType: 'showFound' | 'showDestroyed') => {
    toggleFilter(filterType)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleMenu}>
        <FontAwesome6 name="gear" size={20} color={colors.darkGray} />
      </TouchableOpacity>

      {isMenuOpen && (
        <View style={styles.menu}>
          <Text style={styles.menuTitle}>Show</Text>
          <Pressable style={[styles.menuItem]} onPress={() => handleFilterToggle('showFound')}>
            <View style={styles.checkbox}>
              {filters.showFound ? (
                <LinearGradient
                  colors={[colors.primary, colors.accent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.checkboxGradient}
                >
                  <FontAwesome6 name="check" size={12} color={colors.white} />
                </LinearGradient>
              ) : (
                <View style={styles.checkboxEmpty} />
              )}
            </View>
            <Text style={[styles.menuText, filters.showFound && styles.menuTextActive]}>Found</Text>
          </Pressable>

          <Pressable style={[styles.menuItem]} onPress={() => handleFilterToggle('showDestroyed')}>
            <View style={styles.checkbox}>
              {filters.showDestroyed ? (
                <LinearGradient
                  colors={[colors.primary, colors.accent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.checkboxGradient}
                >
                  <FontAwesome6 name="check" size={12} color={colors.white} />
                </LinearGradient>
              ) : (
                <View style={styles.checkboxEmpty} />
              )}
            </View>
            <Text style={[styles.menuText, filters.showDestroyed && styles.menuTextActive]}>Destroyed</Text>
          </Pressable>
        </View>
      )}

      {/* Overlay to close menu when tapping outside */}
      {isMenuOpen && <Pressable style={styles.overlay} onPress={() => setIsMenuOpen(false)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 4,
  },
  button: {
    position: 'absolute',
    top: 120, // Below the location button
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menu: {
    position: 'absolute',
    top: 170, // Below the filter button
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 140,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 12,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxGradient: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxEmpty: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.darkGray,
  },
  menuText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
  },
  menuTextActive: {
    color: colors.black,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
})
