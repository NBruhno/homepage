export const Container = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: theme.color.background,
			border: `1px solid ${theme.color.gray020}`,
			borderRadius: '8px',
			margin: '8px 0',
			overflowWrap: 'break-word',
			transition: `height 135ms ${theme.animation.default}`,
			wordBreak: 'break-word',
		})}
		{...props}
	/>
)
