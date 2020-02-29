import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const Container: React.FC = (props) => {
	const theme: Theme = useTheme()

	return (
		<div
			css={css`
				background-color: ${theme.color.background};
				border: 1px solid ${theme.color.gray};
				overflow-wrap: break-word;
				word-break: break-word;
				border-radius: 8px;
				transition: all 135ms cubic-bezier(0.4, 0, 0.2, 1);
			`}
			{...props}
		/>
	)
}

export default Container
