export const RadioComponent = (props: React.ComponentProps<'input'>) => (
	<input
		css={{
			position: 'absolute',
			opacity: 0,
			flexShrink: 0,
		}}
		{...props}
	/>
)
