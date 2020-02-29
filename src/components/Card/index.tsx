import Collapse from 'components/Collapse'

import Container from './Container'
import Content from './Content'
import Loader from './Loader'
import Error from './Error'

const Card: React.FC<{ hasError?: boolean, isExpanded?: boolean, isLoading?: boolean, header?: React.ReactNode, isFocus?: boolean }> = (
	{ children, hasError = false, isExpanded = true, isLoading = false, header, isFocus },
) => {
	const elevate = isFocus || isExpanded

	return (
		<Container {...{ elevate }}>
			<Collapse isOpen={isExpanded}>
				<>
					{isExpanded && hasError && <Error>Failed to load content</Error>}
					{isExpanded && !hasError && isLoading && <Loader />}
					{!hasError && !isLoading && <Content header={header} isVisible={isExpanded}>{children}</Content>}
				</>
			</Collapse>
		</Container>
	)
}

export default Card
