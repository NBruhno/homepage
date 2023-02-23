import type { ComponentPropsWithoutRef } from 'react'

export const SteamContainer = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={() => ({
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			columnGap: '12px',
		})}
		{...props}
	/>
)
