import Collapse from 'components/Collapse'

import { Container } from './Container'
import { Content } from './Content'
import { Loader } from './Loader'
import { Error } from './Error'

export type Props = {
	children: React.ReactNode,
	hasError?: boolean,
	header?: React.ReactNode,
	isExpanded?: boolean,
	isFocus?: boolean,
	isLoading?: boolean,
}

export const Card = ({ children, hasError = false, isExpanded = true, isLoading = false, header, isFocus }: Props) => {
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
