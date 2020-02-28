import Container from './Container'
import Line from './Line'

const ChevronFlip = ({ isActive, slim, bold }: { isActive?: boolean, slim?: boolean, bold?: boolean }) => (
	<Container>
		<Line isActive={isActive} slim={slim} bold={bold} />
		<Line isActive={isActive} slim={slim} bold={bold} mirror />
	</Container>
)

export default ChevronFlip
