/* eslint-disable jsx-a11y/label-has-associated-control */

export const Hint = (props: React.ComponentProps<'label'>) => (
	<label
		css={(theme: Theme) => ({
			color: theme.color.textFaded,
			flexShrink: 0,
			fontFamily: theme.fontFamily.roboto,
			fontSize: theme.fontSize.s70,
			verticalAlign: '1.5px',
		})}
		{...props}
	/>
)
