/* eslint-disable jsx-a11y/heading-has-content */

export const Subtitle = (props: React.ComponentProps<'h2'>) => (
	<h2
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s90,
			textAlign: 'center',
			margin: '12px 0 16px',
			opacity: 0.8,
		})}
		{...props}
	/>
)
