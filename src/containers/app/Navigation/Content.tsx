export const Content = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'stretch',

			'&:first-of-type': {
				overflowX: 'hidden',
				overflowY: 'auto',
			},
		}}
		{...props}
	/>
)
