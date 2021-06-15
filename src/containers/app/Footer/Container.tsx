import type { ComponentProps } from 'react'

export const Container = (props: ComponentProps<'footer'>) => (
	<footer
		css={(theme: Theme) => ({
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
