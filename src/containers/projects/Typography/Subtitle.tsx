/* eslint-disable jsx-a11y/heading-has-content */
export const Subtitle = (props: React.ComponentProps<'h3'>) => (
	<h3
		css={(theme: Theme) => ({
			fontFamily: theme.fontFamily.roboto,
			fontSize: theme.fontSize.s90,
			margin: '6px 0 42px',
			opacity: 0.7,
		})}
		{...props}
	/>
)
