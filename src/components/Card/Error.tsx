import { css, keyframes } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const fadeIn = keyframes`
	0% { opacity: 0; }
`

const Error: React.FC = (props) => {
	const theme: Theme = useTheme()

	return (
		<div
			css={css`
				min-height: 200px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				font-size: ${theme.fontSize.small};

				opacity: 0.6;

				animation: ${fadeIn} 0.2s;
			`}
			{...props}
		/>
	)
}

export default Error
