import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const Container = ({ isVisible, isFocus, ...rest }) => {
	const theme: Theme = useTheme()
	const style = css`
		background-color: ${theme.color.error};
		height: ${isVisible ? '33' : '0'}px;
		transition: height 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		width: 100%;
		border-radius: 4px;
		box-shadow: 0 0 0 2px ${isVisible && isFocus ? theme.color.error : 'none'};
		overflow: hidden;
	`

	return <div css={style} {...rest} />
}

export default Container
