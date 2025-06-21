import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Filters {
  showFound: boolean
  showDestroyed: boolean
}

interface FiltersContextType {
  filters: Filters
  setFilters: (filters: Filters) => void
  toggleFilter: (filterType: keyof Filters) => void
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

interface FiltersProviderProps {
  children: ReactNode
}

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [filters, setFilters] = useState<Filters>({
    showFound: true,
    showDestroyed: true,
  })

  const toggleFilter = (filterType: keyof Filters) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType],
    }))
  }

  return <FiltersContext.Provider value={{ filters, setFilters, toggleFilter }}>{children}</FiltersContext.Provider>
}

export function useFiltersContext() {
  const context = useContext(FiltersContext)
  if (context === undefined) {
    throw new Error('useFiltersContext must be used within a FiltersProvider')
  }
  return context
}
