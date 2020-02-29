import { css } from '@emotion/core'

const Content: React.FC<{ isVisible: boolean, header?: React.ReactNode }> = ({ isVisible, header, ...rest }) => (
	<div
		css={css`
			padding: 16px 24px 30px;
			min-height: 100px;
			opacity: ${isVisible ? 1 : 0};
			transition: opacity 0.2s ease-in-out;
			padding-top: ${header && 0};
		`}
		{...rest}
	/>
)

export default Content
