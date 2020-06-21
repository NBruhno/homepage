import { Container } from './Container'
import { Line } from './Line'

type Props = {
	bold?: boolean,
	isActive?: boolean,
	slim?: boolean,
}

export const ChevronFlip = ({ isActive, slim, bold }: Props) => (
	<Container>
		<Line isActive={isActive} slim={slim} bold={bold} />
		<Line isActive={isActive} slim={slim} bold={bold} mirror />
	</Container>
)
