import NextImage from 'next/image'

type Props = {
	alt: string,
	height: string | number,
	loading?: 'lazy' | 'eager',
	quality?: number,
	src: string,
	width: string | number,
}

export const Image = ({ loading = 'lazy', alt, width, height, src, quality, ...rest }: Props) => (
	<div
		css={{
			cursor: 'zoom-in',
			display: 'flex',
			justifyContent: 'center',
		}}
	>
		<NextImage
			alt={alt}
			height={height}
			loading={loading}
			quality={quality}
			src={src}
			width={width}
			placeholder='blur'
			blurDataURL='LGJIFP000KWBx]nP?IWB4nRi~qbI'
			{...rest}
		/>
	</div>
)
