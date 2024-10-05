import type NextImage from 'next/image'
import type { ComponentPropsWithRef } from 'react'

import { useLoading } from 'states/page'

import { Container } from './Container'
import { Image } from './Image'
import { Placeholder } from './Placeholder'
import { Shine } from './Shine'

type Props = ComponentPropsWithRef<typeof NextImage> & {
	coverUrl: string | null,
	isPriority?: boolean,
	isShineVisible?: boolean,
}

export const GameCover = ({ coverUrl, isPriority = false, isShineVisible = false, ...rest }: Props) => {
	const { isLoading } = useLoading()

	if (!coverUrl || isLoading) return <Placeholder />
	return (
		<Container>
			<Image
				{...rest}
				loading={isPriority ? 'eager' : 'lazy'}
				priority={isPriority}
				alt='game cover'
				src={coverUrl}
			/>
			<Shine isVisible={isShineVisible} />
		</Container>
	)
}
