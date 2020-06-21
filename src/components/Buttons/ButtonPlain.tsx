export const ButtonPlain = (props: React.ComponentProps<'button'>) => (
	<button
		css={() => ({
			border: 0,
			borderRadius: 'none',
			background: 'none',
			color: 'currentColor',
			fontSize: 'medium',
			lineHeight: 'normal',
			whiteSpace: 'normal',
			textDecoration: 'none',
			padding: '0',
			margin: '0',
			cursor: 'pointer',
			textAlign: 'left',

			'&:focus, &:hover, &:active': {
				outline: 0,
				textDecoration: 'none',
			},

			'&:disabled': {
				cursor: 'default',
				boxShadow: 'none',
			},
		})}
		type='button'
		{...props}
	/>
)
