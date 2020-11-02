/* eslint-disable jsx-a11y/anchor-has-content */

type Props = {
	first?: boolean,
} & React.ComponentProps<'a'>

export const Item = ({ first, ...rest }: Props) => (
	<a
		css={(theme: Theme) => ({
			backgroundColor: theme.color.background,
			borderTopLeftRadius: first ? '4px' : 0,
			borderTopRightRadius: first ? '4px' : 0,
			color: theme.color.text,
			display: 'flex',
			fontFamily: theme.fontFamily.poppins,
			justifyContent: 'space-between',
			margin: 0,
			padding: first ? '12px 10px' : '6px 10px',
			textDecoration: 'none',
			transition: `background-color 135ms ${theme.animation.default}`,

			'&:last-child': {
				borderBottomLeftRadius: '4px',
				borderBottomRightRadius: '4px',
			},

			'&:hover': {
				backgroundColor: theme.color.gray020,
			},
		})}
		{...rest}
	/>
)
