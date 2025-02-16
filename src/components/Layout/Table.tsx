import { styled } from 'styled-components'

export const Table = styled.table`
	border-spacing: 0;
	width: 100%;
	border-width: 1px 1px 0;
	border-style: solid;
	border-color: ${({ theme }) => theme.color.border};
	border-radius: 4px;
	font-size: ${({ theme }) => theme.font.size.s90};

	td,
	th {
		border-width: 0 1px 1px 0;
		border-style: solid;
		border-color: ${({ theme }) => theme.color.border};
		padding: 6px 12px;

		&:last-child {
			border-right: none;
		}
	}

	th {
		font-family: ${({ theme }) => theme.font.family.poppins};
		font-size: ${({ theme }) => theme.font.size.s100};
		text-align: left;
		color: ${({ theme }) => theme.color.text};
		background-color: ${({ theme }) => theme.color.gray010};

		&:first-of-type {
			border-top-left-radius: 4px;
		}

		&:last-child {
			border-top-right-radius: 4px;
		}
	}

	tr:last-child {
		td:first-of-type {
			border-bottom-left-radius: 4px;
		}

		td:last-child {
			border-bottom-right-radius: 4px;
		}
	}
`
