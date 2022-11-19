import { IconX } from '@tabler/icons'

import { ButtonIcon } from 'components/Buttons'

type Props = {
	isVisible?: boolean,
	onClick: () => void,
}

export const InputClearButton = ({ isVisible = true, onClick }: Props) => {
	if (isVisible) {
		return (
			<ButtonIcon
				tabIndex={-1}
				css={(theme) => ({
					height: '100%',
					margin: '0',
					color: theme.color.gray050,
					borderRadius: 0,
					pointerEvents: 'auto',
					width: '40px',

					'&:last-child': {
						borderRadius: '0 2px 2px 0',
					},

					'&:hover:enabled': {
						backgroundColor: theme.color.errorBackgroundHover,
						color: theme.color.error,
					},
				})}
				label={<IconX size={22} />}
				onClick={(event) => {
					event.preventDefault()
					return onClick()
				}}
			/>
		)
	}

	return null
}
