import type { ReactNode } from 'react'

export const JsonWrapper = ({ children }: { children: ReactNode }) => (
	<pre
		css={(theme) => ({
			minHeight: '100px',
			padding: '12px 24px',
			backgroundColor: theme.color.gray020,
			color: theme.color.text,
			borderRadius: '12px',
		})}
	>
		{children}
	</pre>
)
