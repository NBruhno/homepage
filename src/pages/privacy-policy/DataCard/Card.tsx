import { Card as DefaultCard } from 'components/Card'
import { Content } from 'components/Card/Content'
import { styled } from 'styled-components'

export const Card = styled(DefaultCard)`
	> div > div > ${Content} {
		padding: 16px 24px 18px;
	}
`
