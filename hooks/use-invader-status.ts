import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'

const INVADER_STATUSES_KEY = '@invader_statuses'

type InvaderState = {
  found: boolean
  destroyed: boolean
}

type InvaderStates = Record<string, InvaderState>

export function useInvaderStatus() {
  const [states, setStates] = useState<InvaderStates>({})

  // Load states when the component mounts
  useEffect(() => {
    loadStates()
  }, [])

  const loadStates = async () => {
    try {
      const storedStates = await AsyncStorage.getItem(INVADER_STATUSES_KEY)
      if (storedStates) {
        setStates(JSON.parse(storedStates))
      }
    } catch (error) {
      console.error('Error loading invader states:', error)
    }
  }

  const updateState = async (invaderId: string, updates: Partial<InvaderState>) => {
    try {
      const currentState = states[invaderId] || { found: false, destroyed: false }
      const newState = { ...currentState, ...updates }
      const newStates = { ...states, [invaderId]: newState }
      await AsyncStorage.setItem(INVADER_STATUSES_KEY, JSON.stringify(newStates))
      setStates(newStates)
    } catch (error) {
      console.error('Error saving invader state:', error)
    }
  }

  const getState = (invaderId: string): InvaderState => {
    return states[invaderId] || { found: false, destroyed: false }
  }

  return {
    states,
    updateState,
    getState,
  }
}
