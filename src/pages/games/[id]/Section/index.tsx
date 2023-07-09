import type { ReactNode, ComponentPropsWithoutRef } from 'react'

import { Placeholder } from 'components/Placeholder'

type Props = ComponentPropsWithoutRef<'h2'> & {
	title?: string,
	children: ReactNode,
	contentType?: 'other' | 'text',
	titlePlaceholderWidth?: string,
	contentPlaceholderLines?: number,
}

export const Section = ({ title, children, titlePlaceholderWidth = '50%', contentType = 'text', contentPlaceholderLines = 5, ...rest }: Props) => {
	if (!children) return null

	return (
		<section>
			{title && (
				<h2 css={{ marginTop: 0 }} {...rest}>
					<Placeholder width={titlePlaceholderWidth}>
						{title}
					</Placeholder>
				</h2>
			)}
			{contentType === 'text' ? (
				<p>
					<Placeholder lines={contentPlaceholderLines}>
						{children}
					</Placeholder>
				</p>
			) : children}
		</section>
	)
}
