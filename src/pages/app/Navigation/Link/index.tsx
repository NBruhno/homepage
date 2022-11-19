import type { UserRole } from '@prisma/client'

import { useRouter } from 'next/router'
import { forwardRef } from 'react'

import { useResponsive } from 'states/page'
import { useUser } from 'states/users'

import { Tooltip } from 'components/Tooltip'

import { NavLink } from '../../NavLink'
import { Text } from '../Text'

type Props = {
	name: string,
	tooltip?: string,
	url: string,
	allowedRoles?: Array<UserRole>,
	isActive?: boolean,
	renderIcon: () => JSX.Element,
}

export const Link = forwardRef<HTMLAnchorElement, Props>(({ url, renderIcon, name, tooltip, isActive, allowedRoles = [] }, ref) => {
	const { isMobile, setResponsiveState, isSidebarCollapsed } = useResponsive()
	const role = useUser((state) => state.role)
	const { pathname } = useRouter()

	if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) return null

	return (
		<Tooltip
			show={isSidebarCollapsed && !isMobile}
			tip={tooltip ?? name}
			position='right'
			onClick={() => isMobile ? setResponsiveState({ showMenu: false }) : undefined}
		>
			<NavLink
				href={url}
				isActive={isActive ?? pathname === url}
				ref={ref}
			>
				{renderIcon()}<Text>{name}</Text>
			</NavLink>
		</Tooltip>
	)
})
