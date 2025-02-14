import { GridContainer } from 'components/Layout'
import { styled } from 'styled-components'

export const CoverContainer = styled(GridContainer)`
	max-height: 354px;

	${({ theme }) => theme.mediaQueries.minTablet} {
		margin-top: 10px;
	}
`
