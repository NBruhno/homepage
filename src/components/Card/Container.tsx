export const Container = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: theme.color.background,
			border: `1px solid ${theme.color.gray}`,
			borderRadius: '8px',
			margin: '8px 0',
			overflowWrap: 'break-word',
			transition: 'height 135ms cubic-bezier(0.4, 0, 0.2, 1)',
			wordBreak: 'break-word',
		})}
		{...props}
	/>
)
