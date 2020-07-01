/* eslint-disable jsx-a11y/heading-has-content */
export const Title = (props: React.ComponentProps<'h3'>) => (
	<h3
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s115,
			marginTop: '12px',
			marginBottom: '6px',
		})}
		{...props}
	/>
)
