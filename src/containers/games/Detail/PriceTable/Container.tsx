export const Container = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			border: `1px solid ${theme.color.gray020}`,
			borderRadius: '4px',
			marginTop: '12px',
			maxWidth: '400px',

			[theme.mediaQueries.maxTablet]: {
				maxWidth: 'unset',
			},
		})}
		{...props}
	/>
)
