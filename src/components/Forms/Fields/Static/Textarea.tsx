import AutosizeTextarea from 'react-autosize-textarea'

type Props = {
	isAsync: boolean,
	isDisabled: boolean,
	id: string,
	maxRows: number,
	rows: number,
	value: number | string,
}

export const Textarea = (props: Props) => (
	<AutosizeTextarea
		css={(theme) => ({
			backgroundColor: theme.color.grayLight,
			border: `1px solid ${theme.color.gray}`,
			borderRadius: '4px',
			color: theme.color.white,
			cursor: 'auto',
			display: 'block',
			fontSize: theme.font.size.s100,
			margin: '2px 0 -5px',
			padding: '10px 6px',
			resize: 'none',
			textAlign: 'left',
			width: '100%',
		})}
		{...props}
	/>
)
