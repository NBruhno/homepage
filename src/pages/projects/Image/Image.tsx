import NextImage from 'next/image'

type Props = {
	title: string,
	height: number | string,
	loading?: 'eager' | 'lazy' | undefined,
	src: string,
	width: number | string,
}

export const Image = ({ loading = 'lazy', title, width, height, src, ...rest }: Props) => (
	<NextImage
		alt={title}
		height={height}
		width={width}
		loading={loading}
		src={src}
		placeholder='blur'
		blurDataURL='LGJIFP000KWBx]nP?IWB4nRi~qbI'
		{...rest}
		css={{
			cursor: 'zoom-in',
			display: 'flex',
			width: '100%',
			height: '100%',
		}}
	/>
)
