import type { ComponentPropsWithoutRef } from 'react'

import { Spinner } from 'components/Spinner'

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
		<Spinner size={32} />
	</div>
)
