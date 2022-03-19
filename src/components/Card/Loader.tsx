import type { ComponentPropsWithoutRef } from 'react'

import { ActivityIndicator } from 'components/ActivityIndicator'

export const Loader = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={{
			alignItems: 'center',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			minHeight: '100px',
			minWidth: '100px',
		}}
		{...props}
	>
		<ActivityIndicator />
	</div>
)
