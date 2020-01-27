import Container from './Container'
import Line from './Line'

const ChevronFlip = ({ isActive, slim, bold, className }: { isActive?: boolean, slim?: boolean, bold?: boolean, className?: string }) => (
	<Container className={className}>
		<Line isActive={isActive} slim={slim} bold={bold} />
		<Line isActive={isActive} slim={slim} bold={bold} mirror />
	</Container>
)

export default ChevronFlip
