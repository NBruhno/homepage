/* eslint-disable jsx-a11y/label-has-associated-control */

export const Hint = (props: React.ComponentProps<'label'>) => (
	<label
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s80,
			flexShrink: 0,
			verticalAlign: '1.5px',
		})}
		{...props}
	/>
)
