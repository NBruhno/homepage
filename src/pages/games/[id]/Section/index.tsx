import type { ReactNode, ComponentPropsWithoutRef } from 'react'

import { useLoading } from 'states/page'

import { Placeholder } from 'components/Placeholder'

type Props = ComponentPropsWithoutRef<'h2'> & {
	title: string,
	content: ReactNode,
	contentType?: 'other' | 'text',
	titlePlaceholderWidth?: string,
	contentPlaceholderLines?: number,
}

export const Section = ({ title, content, titlePlaceholderWidth = '50%', contentType = 'text', contentPlaceholderLines = 5, ...rest }: Props) => {
	const { isLoading } = useLoading()

	if (!isLoading && !content) return null

	return (
		<section>
			<h2 {...rest}>
				<Placeholder width={titlePlaceholderWidth}>
					{title}
				</Placeholder>
			</h2>
			{contentType === 'text' ? (
				<p>
					<Placeholder lines={contentPlaceholderLines}>
						{content}
					</Placeholder>
				</p>
			) : content}
		</section>
	)
}
