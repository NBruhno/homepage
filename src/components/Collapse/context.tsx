import { createContext } from 'react'

export const context = createContext<null |((transitionTime: number) => void)>(null)
