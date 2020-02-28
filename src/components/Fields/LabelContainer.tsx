/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const LabelContainer: React.FC<{ htmlFor?: string }> = (props) => {
	const theme: Theme = useTheme()

	return (
		<label
			css={css`
				color: ${theme.color.grayDark};
				font-size: ${theme.fontSize.large};
				font-weight: 400;
				margin-bottom: 4px;
			`}
			{...props}
		/>
	)
}

export default LabelContainer
