import { css } from '@emotion/core'

const FieldWrapper: React.FC<{ fullWidth?: boolean, minWidth?: number, forwardRef?: string }> = ({ fullWidth, minWidth, forwardRef, ...rest }) => (
	<div
		css={css`
			display: ${fullWidth ? 'inline' : 'inline-block'};
			min-width: ${`${minWidth}px` || 'auto'};
		`}
		ref={forwardRef}
		{...rest}
	/>
)

export default FieldWrapper
