/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Image from 'next/image'

import { useModal } from 'states/modal'

import { ImageComponent } from './Image'
import { Placeholder } from './Placeholder'

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

type Props = {
	src: string,
	title: string,
	width: number,
	height: number,
	divider?: number,
} & React.ComponentProps<'img'>

export const ProjectImage = ({ src, title, width, height, divider, ...rest }: Props) => {
	const { openModal } = useModal()

	if (!src) {
		return (
			<Placeholder
				width={divider ? width / divider : width}
				height={divider ? height / divider : height}
			/>
		)
	}

	return (
		<div
			onClick={() => {
				openModal((
					<div
						css={{
							alignItems: 'center',
							display: 'fixed',
							justifyContent: 'center',
							padding: '24px',
							width: '100%',
						}}
					>
						<Image
							src={src ?? placeholderImage}
							alt={title}
							unsized
							unoptimized
							css={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'cover' }}
						/>
					</div>
				), { noWrapper: true })
			}}
		>
			<ImageComponent
				src={src}
				title={title}
				width={divider ? width / divider : width}
				height={divider ? height / divider : height}
				{...rest}
			/>
		</div>
	)
}
