/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import type { ComponentProps } from 'react'

import { useModal } from 'states/modal'

import { Image } from './Image'
import { Placeholder } from './Placeholder'

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

type Props = {
	src: string,
	title: string,
	width: number,
	height: number,
	divider?: number,
} & ComponentProps<'img'>

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
							display: 'flex',
							justifyContent: 'center',
							padding: '24px',
							width: '100%',
						}}
					>
						<img
							src={src ?? placeholderImage}
							alt={title}
							css={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'cover' }}
						/>
					</div>
				), { noWrapper: true })
			}}
		>
			<Image
				src={src}
				alt={title}
				width={divider ? width / divider : width}
				height={divider ? height / divider : height}
				{...rest}
			/>
		</div>
	)
}
