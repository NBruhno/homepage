type Props = {
	fill?: boolean,
	transitionTime?: number,
	isAnimated?: boolean,
} & React.ComponentProps<'div'>

export const Container = ({ isAnimated, transitionTime, fill, ...rest }: Props) => (
	<div
		css={[
			{
				overflow: 'hidden',
				transition: `${isAnimated ? `height ${transitionTime}s` : 'none'}`,
			},
			fill ? {
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
			} : undefined,
		]}
		{...rest}
	/>
)
