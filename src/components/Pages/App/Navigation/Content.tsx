export const Content = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'stretch',
		}}
		{...props}
	/>
)
