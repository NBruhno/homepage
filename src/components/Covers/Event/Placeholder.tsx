import { IconTicket } from '@tabler/icons-react'

import { useLoading } from 'states/page'

export const Placeholder = () => {
	const { isLoading } = useLoading()

	return (
		<div
			css={(theme) => ({
				height: '100%',
				width: '100%',
				objectFit: 'cover',
				margin: '0',
				borderRadius: '8px',
				aspectRatio: '16 / 9',
				color: theme.color.grayLight,
				background: [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`],

				[theme.mediaQueries.maxMobile]: {
					width: '100%',
					maxWidth: 'unset',
					height: 'auto',
					maxHeight: 'unset',
				},
			})}
		>
			{!isLoading && <IconTicket size={48} />}
		</div>
	)
}
