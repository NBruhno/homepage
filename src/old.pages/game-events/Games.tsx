import type { ComponentPropsWithoutRef } from 'react'

export const Games = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			display: 'grid',
			justifyContent: 'space-between',
			columnGap: '10px',
			rowGap: '8px',
			gridTemplateColumns: 'repeat(auto-fill, 71px)',

			[theme.mediaQueries.maxMobile]: {
				gridTemplateColumns: 'repeat(auto-fill, 18%)',
			},
		})}
		{...props}
	/>
)
