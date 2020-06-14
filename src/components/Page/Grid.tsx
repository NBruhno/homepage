export const Grid = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			display: 'grid',
			gridTemplateRows: 'auto 1fr auto',
			minHeight: '100vh',
		}}
		{...props}
	/>
)
