import { css } from '@emotion/core'

const Page: React.FC = (props) => (
	<div
		css={css`
			width: 100%;
			max-width: 904px;
			margin: 0 auto;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			padding: 16px 24px 120px;
			justify-content: center;
		`}
		{...props}
	/>
)

export default Page
