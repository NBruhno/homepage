import { Container } from './Container'
import { Line } from './Line'

type Props = {
	isBold?: boolean,
	isActive?: boolean,
	isSlim?: boolean,
	isHorizontal?: boolean,
}

export const ChevronFlip = ({ isActive = false, isSlim = false, isBold = false, isHorizontal = false }: Props) => (
	<Container>
		<Line isActive={isActive} isSlim={isSlim} isBold={isBold} isHorizontal={isHorizontal} />
		<Line isActive={isActive} isSlim={isSlim} isBold={isBold} isHorizontal={isHorizontal} shouldMirror />
	</Container>
)
