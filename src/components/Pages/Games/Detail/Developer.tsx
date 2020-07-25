/* eslint-disable jsx-a11y/heading-has-content */
export const Developer = (props: React.ComponentProps<'h1'>) => (
	<h1
		css={(theme: Theme) => ({
			color: theme.color.white,
			fontSize: theme.fontSize.s115,
			marginBottom: '16px',
			marginTop: '12px',

			[theme.mediaQueries.maxMobile]: {
				fontSize: theme.fontSize.s90,
				marginTop: '8px',
			},
		})}
		{...props}
	/>
)
