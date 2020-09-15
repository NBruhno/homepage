export const TitleWrapper = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			display: 'grid',
			gridTemplateRows: '204px max-content',
			gridTemplateColumns: '1fr',

			[theme.mediaQueries.maxMobile]: {
				gridTemplateRows: '140px auto',
			},

		})}
		{...props}
	/>
)
