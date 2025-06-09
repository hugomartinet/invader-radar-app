import React, { createContext, useContext, PropsWithChildren } from 'react'
import { Invader, InvaderStatus } from '../types/invader'

interface InvadersContextType {
  invaders: Invader[]
  setInvaders: (invaders: Invader[]) => void
  statuses: Record<string, InvaderStatus>
  setStatuses: (statuses: Record<string, InvaderStatus>) => void
  selectedInvader: Invader | null
  setSelectedInvader: (invader: Invader | null) => void
}

const InvadersContext = createContext<InvadersContextType | undefined>(undefined)

export function InvadersContextProvider({ children }: PropsWithChildren) {
  const [invaders, setInvaders] = React.useState<Invader[]>([])
  const [statuses, setStatuses] = React.useState<Record<string, InvaderStatus>>({})
  const [selectedInvader, setSelectedInvader] = React.useState<Invader | null>(null)

  return (
    <InvadersContext.Provider value={{ invaders, setInvaders, statuses, setStatuses, selectedInvader, setSelectedInvader }}>
      {children}
    </InvadersContext.Provider>
  )
}

export function useInvadersContext() {
  const context = useContext(InvadersContext)
  if (context === undefined) {
    throw new Error('useInvaders must be used within an InvadersProvider')
  }
  return context
}
