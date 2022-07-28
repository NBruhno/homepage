import type { ComponentProps } from 'react'
import type { UserRole } from 'types'

import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'

import { useResponsive } from 'states/page'
import { useUser } from 'states/users'

import type { Svg } from 'components/Icons/Svg'
import { Tooltip } from 'components/Tooltip'

import { NavLink } from '../../NavLink'
import { Text } from '../Text'

type Props = {
	name: string,
	url: string,
	Icon: (props: Partial<ComponentProps<typeof Svg>>) => JSX.Element,
	allowedRoles?: Array<UserRole>,
	isActive?: boolean,
}

export const Link = forwardRef<HTMLAnchorElement, Props>(({ url, Icon, name, isActive, allowedRoles = [] }, ref) => {
	const { isMobile, setResponsiveState, isSidebarCollapsed } = useResponsive()
	const role = useUser((state) => state.role)
	const { pathname } = useRouter()

	if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) return null

	return (
		<NextLink
			href={url}
			passHref
		>
			<Tooltip
				show={isSidebarCollapsed && !isMobile}
				tip={name}
				position='right'
				onClick={() => isMobile ? setResponsiveState({ showMenu: false }) : undefined}
			>
				<NavLink
					isActive={isActive ?? pathname === url}
					ref={ref}
				>
					<Icon title={name} size={22} css={{ marginRight: '12px' }} /><Text>{name}</Text>
				</NavLink>
			</Tooltip>
		</NextLink>
	)
})
