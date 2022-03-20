import type { ComponentPropsWithoutRef } from 'react'

export const Container = (props: ComponentPropsWithoutRef<'footer'>) => (
	<footer
		css={(theme) => ({
			backgroundColor: theme.color.background,
			borderTop: `1px solid ${theme.color.border}`,
			bottom: 0,
			color: theme.color.text,
			height: '72px',
			marginTop: 'auto',
			padding: '12px 24px',
			verticalAlign: 'bottom',

			[theme.mediaQueries.maxMobile]: {
				textAlign: 'center',
			},
		})}
		{...props}
	/>
)
