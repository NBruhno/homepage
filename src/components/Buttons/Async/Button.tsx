/* eslint-disable react/button-has-type */
type Props = {
	isVisible: boolean,
} & React.ComponentProps<'button'>

export const Button = ({ isVisible, ...rest }: Props) => (
	<button
		css={{
			backgroundColor: '#000',
			border: 'none',
			color: '#FFF',
			cursor: 'pointer',
			display: 'inline-block',
			flexGrow: 0,
			fontSize: '1rem',
			height: '36px',
			margin: '2px',
			maxWidth: '100%',
			minWidth: '72px',
			overflow: 'hidden',
			padding: '5px 30px',
			position: 'relative',
			textAlign: 'center',
			touchAction: 'manipulation',
			transition: 'color 135ms cubic-bezier(0.4, 0, 0.2, 1), background-color 135ms cubic-bezier(0.4, 0, 0.2, 1)',
			userSelect: 'none',
			verticalAlign: 'middle',
			visibility: isVisible ? 'visible' : 'hidden',
			whiteSpace: 'nowrap',

			'&:first-of-type': {
				marginLeft: 0,
			},

			'&:last-of-type': {
				marginRight: 0,
			},

			'&:focus, &:hover, &:active': {
				outline: 0,
				textDecoration: 'none',
			},

			'&:disabled': {
				cursor: 'default',
				boxShadow: 'none',
			},
		}}
		{...rest}
	/>
)
