import { type ComponentProps } from 'react'

export const Table = (props: ComponentProps<'table'>) => (
	<table
		css={(theme) => ({
			borderSpacing: 0,
			width: '100%',
			borderWidth: '1px 1px 0 1px',
			borderStyle: 'solid',
			borderColor: theme.color.border,
			borderRadius: '4px',
			fontSize: theme.font.size.s90,

			th: {
				fontFamily: theme.font.family.poppins,
				fontSize: theme.font.size.s100,
				textAlign: 'left',
				color: theme.color.text,
				backgroundColor: theme.color.gray010,

				'&:first-child': {
					borderTopLeftRadius: '4px',
				},

				'&:last-child': {
					borderTopRightRadius: '4px',
				},
			},

			'td, th': {
				borderWidth: '0 1px 1px 0',
				borderStyle: 'solid',
				borderColor: theme.color.border,
				padding: '6px 12px',

				'&:last-child': {
					borderRight: 'none',
				},
			},

			'tr:last-child': {
				'td:first-child': {
					borderBottomLeftRadius: '4px',
				},

				'td:last-child': {
					borderBottomRightRadius: '4px',
				},
			},
		})}
		{...props}
	/>
)
