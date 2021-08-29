import NextImage from 'next/image'

type Props = {
	title: string,
	height: string | number,
	loading?: 'lazy' | 'eager' | undefined,
	src: string,
	width: string | number,
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
