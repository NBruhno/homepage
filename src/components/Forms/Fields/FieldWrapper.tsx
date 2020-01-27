import { css } from '@emotion/core'

const FieldWrapper = ({ fullWidth, minWidth, forwardRef, ...rest }: { fullWidth?: boolean, minWidth?: number, forwardRef?, children? }) => {
	const style = css`
		display: ${fullWidth ? 'inline' : 'inline-block'};
		min-width: ${`${minWidth}px` || 'auto'};
	`

	return <div css={style} ref={forwardRef} {...rest} />
}

export default FieldWrapper
