import { ChevronFlip } from 'components/ChevronFlip'
import { Spinner } from 'components/Spinner'

type Props = {
	isMenuOpen: boolean,
	isLoading: boolean,
}

export const InputMenuIndicator = ({ isMenuOpen, isLoading }: Props) => (
	<div
		css={(theme) => ({
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: 'calc(100% - 12px)',
			margin: '6px 0',
			color: theme.color.gray050,
			borderLeft: `1px solid ${theme.color.gray020}`,
			padding: '0 10px',
		})}
	>
		{isLoading ? (
			<Spinner size={22} />
		) : (
			<ChevronFlip isActive={!isMenuOpen} />
		)}
	</div>
)
