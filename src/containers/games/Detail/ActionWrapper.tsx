import type { ComponentProps } from 'react'

export const ActionWrapper = (props: ComponentProps<'div'>) => (
	<div
		css={{
			marginTop: '16px',
			display: 'grid',
			gridTemplateColumns: '140px 88px repeat(auto-fit, minmax(120px, max-content))',
			gridGap: '8px',
			alignItems: 'center',
		}}
		{...props}
	/>
)
