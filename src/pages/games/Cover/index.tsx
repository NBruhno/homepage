import type { ComponentPropsWithoutRef } from 'react'
import type { GameImagePlaceholder } from 'types'

import { forwardRef } from 'react'

import { useLoading } from 'states/page'

import { CoverWrapper } from './CoverWrapper'
import { Image } from './Image'
import { Placeholder } from './Placeholder'

type Props = ComponentPropsWithoutRef<'img'> & {
	coverUrl?: string | null,
	imageProps?: GameImagePlaceholder,
	isPriority?: boolean,
}

export const Cover = forwardRef<HTMLDivElement, Props>(({ coverUrl, imageProps, isPriority = false, ...rest }, ref) => {
	const { isLoading } = useLoading()

	if (!coverUrl || isLoading) {
		return (
			<CoverWrapper {...rest} ref={ref}>
				<Placeholder />
			</CoverWrapper>
		)
	}

	return (
		<CoverWrapper {...rest} ref={ref}>
			<Image isPriority={isPriority} imageProps={imageProps} src={coverUrl} />
		</CoverWrapper>
	)
})
