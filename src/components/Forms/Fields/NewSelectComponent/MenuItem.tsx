import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const style = ({ highlightedIndex, selectedItem, index, value, theme }) => css`
	background-color: ${highlightedIndex === index ? theme.color.primary : theme.color.white};
	font-weight: ${selectedItem === value ? 'bold' : 'normal'};
	color: ${theme.color.black};
	padding: 6px 12px;

	&:hover {

	}
`

const MenuItem = ({ highlightedIndex, selectedItem, index, value, ...rest }) => {
	const theme: Theme = useTheme()
	return <div css={style({ highlightedIndex, selectedItem, index, value, theme })} {...rest} />
}

export default MenuItem
