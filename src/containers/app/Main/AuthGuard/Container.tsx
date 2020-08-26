type Props = {
	show: boolean,
} & React.ComponentProps<'div'>

export const Container = ({ show, children, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			display: 'flex',
			left: 0,
			opacity: show ? 1 : 0,
			pointerEvents: 'none',
			position: 'absolute',
			right: 0,
			transition: `opacity 135ms ${theme.animation.default}`,
			visibility: show ? 'visible' : 'hidden',
			zIndex: 5,

			[theme.mediaQueries.maxMobile]: {
				transition: 'none',
			},
		})}
		{...rest}
	>
		<div
			css={{
				display: 'flex',
				margin: 'auto',
				maxWidth: '100%',
				padding: '24px',
				pointerEvents: show ? 'auto' : 'none',
				visibility: show ? 'visible' : 'hidden',
				width: '450px',
			}}
		>
			{children}
		</div>
	</div>
)
