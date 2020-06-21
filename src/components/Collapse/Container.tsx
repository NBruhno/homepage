export const transitionTime = 0.3

type Props = {
	fill?: boolean,
	isAnimated?: boolean,
} & React.ComponentProps<'div'>

const Container = ({ isAnimated, fill, ...rest }: Props) => (
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

export default Container
