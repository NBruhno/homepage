export const Page = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			padding: '24px',
			overflow: 'hidden',
			position: 'relative',
		}}
		{...props}
	/>
)
