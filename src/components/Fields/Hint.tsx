/* eslint-disable jsx-a11y/label-has-associated-control */

export const Hint = (props: React.ComponentProps<'label'>) => (
	<label
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.small,
			flexShrink: 0,
			verticalAlign: '1.5px',
		})}
		{...props}
	/>
)
