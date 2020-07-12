export const Page = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			padding: '24px',
			maxWidth: '904px',
			width: '100%',
			margin: '0 auto',
		}}
		{...props}
	/>
)
