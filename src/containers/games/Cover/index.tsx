import type { ComponentPropsWithoutRef } from 'react'

import { useLoading } from 'states/isLoading'

import { CoverWrapper } from './CoverWrapper'
import { Image } from './Image'
import { Placeholder } from './Placeholder'

type Props = ComponentPropsWithoutRef<'img'> & {
	coverUrl?: string | null,
	size?: string,
}

export const Cover = ({ coverUrl, alt, ...rest }: Props) => {
	const { isLoading } = useLoading()

	if (!coverUrl || isLoading) {
		return (
			<CoverWrapper {...rest}>
				<Placeholder />
			</CoverWrapper>
		)
	}

	return (
		<CoverWrapper {...rest}>
			<Image alt={alt} src={coverUrl} />
		</CoverWrapper>
	)
}
