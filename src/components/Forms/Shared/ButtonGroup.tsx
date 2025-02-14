import { ButtonSolid } from 'components/Buttons'
import { styled } from 'styled-components'

export const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		flex-direction: column-reverse;

		> ${ButtonSolid} {
			width: 100%;
			margin-bottom: 12px;
		}
	}
`
