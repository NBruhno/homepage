import AutosizeTextarea from 'react-autosize-textarea'

type Props = {
	async: boolean,
	disabled: boolean,
	id: string,
	maxRows: number,
	rows: number,
	value: string | number,
}

export const Textarea = (props: Props) => (
	<AutosizeTextarea
		css={(theme: Theme) => ({
			backgroundColor: theme.color.grayLight,
			border: `1px solid ${theme.color.gray}`,
			borderRadius: '4px',
			color: theme.color.white,
			cursor: 'auto',
			display: 'block',
			fontSize: theme.fontSize.s100,
			margin: '2px 0 -5px',
			padding: '10px 6px',
			resize: 'none',
			textAlign: 'left',
			width: '100%',
		})}
		{...props}
	/>
)
