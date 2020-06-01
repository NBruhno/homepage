/* eslint-disable jsx-a11y/label-has-associated-control */
export const RowLabel = (props: React.ComponentProps<'label'>) => (
	<label
		css={(theme: Theme) => ({
			display: 'grid',
			gridTemplateColumns: 'min-content 1fr',
			color: theme.color.text,
			fontSize: theme.fontSize.large,
			fontWeight: 300,
			margin: '0 12px 20px 0',
		})}
		{...props}
	/>
)
