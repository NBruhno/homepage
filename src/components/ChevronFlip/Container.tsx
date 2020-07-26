export const Container = (props: React.ComponentProps<'span'>) => (
	<span
		css={{
			display: 'inline-block',
			height: '1em',
			position: 'relative',
			width: '1.4em',
		}}
		{...props}
	/>
)
