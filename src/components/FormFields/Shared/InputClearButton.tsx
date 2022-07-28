import { ButtonIcon } from 'components/Buttons'
import { CloseIcon } from 'components/Icons'

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
					position: 'absolute',
					right: 0,
					top: '2px',
					bottom: '2px',
					height: 'calc(100% - 4px)',
					borderRadius: '0 2px 2px 0',
					paddingTop: '9px',
					zIndex: 1,
					color: theme.color.gray050,
					'&:hover:enabled': {
						backgroundColor: theme.color.errorBackgroundHover,
						color: theme.color.error,
					},
				})}
				label={(
					<CloseIcon
						size={20}
					/>
				)}
				onClick={(event) => {
					event.preventDefault()
					return onClick()
				}}
			/>
		)
	}

	return null
}
