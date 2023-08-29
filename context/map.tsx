import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { Pin } from '../types/pin'

interface MapContext {
  selectedPin: Pin | null
  setSelectedPin: (pin: Pin | null) => void
}

const defaultMapContext: MapContext = {
  selectedPin: null,
  setSelectedPin: () => {},
}

const MapContext = createContext(defaultMapContext)

export function useMapContext() {
  return useContext(MapContext)
}

export function MapContextProvider(props: PropsWithChildren) {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null)
  return <MapContext.Provider {...props} value={{ selectedPin, setSelectedPin }} />
}
