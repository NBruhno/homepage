import { createContext } from 'react'

export const context = createContext<((transitionTime: number) => void) | null>(null)
