export const Text = (props: React.ComponentProps<'span'>) => (
	<span
		css={{
			overflow: 'hidden',
			textOverflow: 'clip',
			whiteSpace: 'nowrap',
			color: 'currentColor',
		}}
		{...props}
	/>
)
