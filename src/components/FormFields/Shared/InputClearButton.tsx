import { useHover } from '@react-aria/interactions'

import { ButtonIcon } from 'components/Buttons'
import { CloseIcon } from 'components/Icons'

type Props = {
	isVisible?: boolean,
	onClick: () => void,
}

export const InputClearButton = ({ isVisible = true, onClick }: Props) => {
	const { hoverProps, isHovered } = useHover({})

	if (isVisible) {
		return (
			<ButtonIcon
				{...hoverProps}
				css={() => ({
					position: 'absolute',
					right: 0,
					top: '2px',
					height: '38px',
					borderRadius: '0 2px 2px 0',
					paddingTop: '9px',
				})}
				label={(
					<CloseIcon
						size={20}
						css={(theme) => ({
							color: isHovered ? theme.color.text : theme.color.gray050,
						})}
					/>
				)}
				onClick={onClick}
			/>
		)
	}

	return null
}
