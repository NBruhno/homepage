/* eslint-disable jsx-a11y/anchor-has-content */
export const Header = (props: React.ComponentProps<'a'>) => (
	<a
		css={(theme: Theme) => ({
			alignItems: 'center',
			backgroundColor: theme.color.grayDark,
			color: theme.color.text,
			display: 'flex',
			height: '35px',
			marginBottom: '12px',
			padding: '12px 24px',
			textDecoration: 'none',
		})}
		{...props}
	/>
)
