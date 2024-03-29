/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import type { ComponentPropsWithoutRef } from 'react'

import { useModal } from 'states/page'

import { Image } from './Image'
import { Placeholder } from './Placeholder'

type Props = ComponentPropsWithoutRef<'img'> & {
	src: string,
	title: string,
	width: number,
	height: number,
	divider?: number,
}

export const ProjectImage = ({ src, title, width, height, divider, ...rest }: Props) => {
	const { onOpenModal } = useModal()

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
				onOpenModal((
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
							src={src}
							alt={title}
							css={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'cover' }}
						/>
					</div>
				), { hasNoWrapper: true })
			}}
		>
			<Image
				src={src}
				title={title}
				width={divider ? width / divider : width}
				height={divider ? height / divider : height}
				{...rest}
			/>
		</div>
	)
}
