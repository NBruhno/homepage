import type { ComponentPropsWithoutRef } from 'react'

import { useLoading } from 'states/page'

import { Image } from './Image'
import { Placeholder } from './Placeholder'
import { Shine } from './Shine'

type Props = ComponentPropsWithoutRef<'img'> & {
	coverUrl?: string | null,
	isPriority?: boolean,
	isShineVisible?: boolean,
}

export const Cover = ({ coverUrl, isPriority = false, isShineVisible = false, ...rest }: Props) => {
	const { isLoading } = useLoading()

	if (!coverUrl || isLoading) return <Placeholder />
	return (
		<div css={{ position: 'relative', overflow: 'hidden' }}>
			<Image isPriority={isPriority} src={coverUrl} {...rest} />
			<Shine isVisible={isShineVisible} />
		</div>
	)
}
