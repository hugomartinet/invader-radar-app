import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback } from 'react'
import { useInvadersContext } from './use-invaders-context'
import { InvaderStatus } from '../types/invader'

const INVADER_STATUSES_KEY = '@invader_statuses'

export function useInvaderStatuses() {
  const { statuses, setStatuses } = useInvadersContext()

  const loadStatuses = useCallback(async () => {
    try {
      const storedStatuses = await AsyncStorage.getItem(INVADER_STATUSES_KEY)
      if (storedStatuses) {
        setStatuses(JSON.parse(storedStatuses))
      }
    } catch (error) {
      console.error('Error loading invader statuses:', error)
    }
  }, [setStatuses])

  const getStatus = useCallback(
    (invaderId: string) => {
      return statuses[invaderId] || { found: false, destroyed: false }
    },
    [statuses]
  )

  const updateStatus = useCallback(
    async (invaderId: string, updates: Partial<InvaderStatus>) => {
      try {
        const currentState = statuses[invaderId] || { found: false, destroyed: false }
        const newState = { ...currentState, ...updates }
        const newStatuses = { ...statuses, [invaderId]: newState }
        await AsyncStorage.setItem(INVADER_STATUSES_KEY, JSON.stringify(newStatuses))
        setStatuses(newStatuses)
      } catch (error) {
        console.error('Error saving invader status:', error)
      }
    },
    [statuses, setStatuses]
  )

  return { loadStatuses, getStatus, updateStatus }
}
