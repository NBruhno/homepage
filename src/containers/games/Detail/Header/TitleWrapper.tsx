/* eslint-disable jsx-a11y/heading-has-content */
export const TitleWrapper = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			display: 'grid',
			gridTemplateRows: '204px auto',

			[theme.mediaQueries.maxMobile]: {
				gridTemplateRows: '140px auto',
			},

		})}
		{...props}
	/>
)
