import type { ReactNode } from 'react'

export const Title = ({ children }: { children: ReactNode }) => (
	<h3 css={{ margin: '16px 0 2px' }}>{children}</h3>
)
