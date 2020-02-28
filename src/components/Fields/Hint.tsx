/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const Hint: React.FC = (props) => {
	const theme: Theme = useTheme()

	return (
		<span
			css={css`
				font-size: ${theme.fontSize.small};
				flex-shrink: 0;
				vertical-align: 1.5px;
			`}
			{...props}
		/>
	)
}

export default Hint
