import NextImage from 'next/image'

type Props = {
	title: string
	height: number
	loading?: 'eager' | 'lazy' | undefined
	src: string
	width: number
}

export const Image = ({ loading = 'lazy', title, width, height, src, ...rest }: Props) => (
	<NextImage
		alt={title}
		height={height * 1.8}
		width={width * 1.8}
		loading={loading}
		src={src}
		placeholder='blur'
		blurDataURL='LGJIFP000KWBx]nP?IWB4nRi~qbI'
		{...rest}
		style={{
			cursor: 'zoom-in',
			display: 'flex',
			width: '100%',
			height: '100%',
		}}
	/>
)
