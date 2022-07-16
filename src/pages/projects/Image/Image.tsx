import NextImage from 'next/future/image'

type Props = {
	title: string,
	height: number | string,
	loading?: 'eager' | 'lazy' | undefined,
	src: string,
	width: number | string,
}

export const Image = ({ loading = 'lazy', title, width, height, src, ...rest }: Props) => (
	<div
		css={{
			cursor: 'zoom-in',
			display: 'flex',
			justifyContent: 'center',
		}}
	>
		<NextImage
			alt={title}
			height={height}
			loading={loading}
			src={src}
			width={width}
			placeholder='blur'
			blurDataURL='LGJIFP000KWBx]nP?IWB4nRi~qbI'
			{...rest}
		/>
	</div>
)
