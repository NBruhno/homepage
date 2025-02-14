import { IconAlertCircle } from '@tabler/icons-react'
import { styled } from 'styled-components'

export const Icon = styled(IconAlertCircle).attrs({
	size: 20,
})`
	color: ${({ theme }) => theme.color.white};
	margin: 8px 0 0 5px;
`
