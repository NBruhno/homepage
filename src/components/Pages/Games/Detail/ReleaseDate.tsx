/* eslint-disable jsx-a11y/heading-has-content */
export const ReleaseDate = (props: React.ComponentProps<'h1'>) => (
	<h1
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s125,
			marginTop: '12px',
			marginBottom: 0,
			color: theme.color.white,

			[theme.mediaQueries.maxMobile]: {
				fontSize: theme.fontSize.s100,
				marginTop: '8px',
			},
		})}
		{...props}
	/>
)
