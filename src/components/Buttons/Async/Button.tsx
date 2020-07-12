/* eslint-disable react/button-has-type */
type Props = {
	fullWidth?: boolean,
	isVisible: boolean,
} & React.ComponentProps<'button'>

export const Button = ({ isVisible, fullWidth, ...rest }: Props) => (
	<button
		css={(theme: Theme) => ({
			backgroundColor: '#000',
			border: 'none',
			color: '#FFF',
			cursor: 'pointer',
			display: 'inline-block',
			flexGrow: 0,
			fontSize: '1rem',
			height: '36px',
			maxWidth: '100%',
			minWidth: '72px',
			padding: '5px 30px',
			position: 'relative',
			textAlign: 'center',
			touchAction: 'manipulation',
			transition: 'color 135ms cubic-bezier(0.4, 0, 0.2, 1), background-color 135ms cubic-bezier(0.4, 0, 0.2, 1)',
			userSelect: 'none',
			verticalAlign: 'middle',
			visibility: isVisible ? 'visible' : 'hidden',
			whiteSpace: 'nowrap',
			width: fullWidth ? '100%' : 'auto',

			'&:focus, &:hover, &:active': {
				outline: 0,
				textDecoration: 'none',
			},

			'&:disabled': {
				cursor: 'default',
				boxShadow: 'none',
			},

			'&:after': {
				content: '""',
				display: 'block',
				position: 'absolute',
				top: '-2px',
				bottom: '-2px',
				left: '-2px',
				right: '-2px',
				borderRadius: '5px',
				boxShadow: `0 0 0 0 ${theme.color.text}`,
				transition: 'box-shadow 135ms cubic-bezier(0.4, 0, 0.2, 1)',
			},

			'&:focus:after': {
				boxShadow: `0 0 0 ${theme.darkTheme ? '1px' : '2px'} ${theme.color.text}`,
			},
		})}
		{...rest}
	/>
)
