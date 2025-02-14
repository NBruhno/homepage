import { useNavigationLoading } from 'states/page'
import { Bar } from './Bar'
import { Container } from './Container'

export const LoadingBar = () => {
	const isNavigationLoading = useNavigationLoading()

	return (
		<Container>
			<Bar isLoading={isNavigationLoading} />
		</Container>
	)
}
