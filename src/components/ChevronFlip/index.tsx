import { Container } from './Container'
import { Line } from './Line'

type Props = {
	bold?: boolean,
	isActive?: boolean,
	slim?: boolean,
	horizontal?: boolean,
}

export const ChevronFlip = ({ isActive, slim, bold, horizontal = false }: Props) => (
	<Container>
		<Line isActive={isActive} slim={slim} bold={bold} horizontal={horizontal} />
		<Line isActive={isActive} slim={slim} bold={bold} horizontal={horizontal} mirror />
	</Container>
)
