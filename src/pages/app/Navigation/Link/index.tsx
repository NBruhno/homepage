import type { UserRole } from 'types'

import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'

import { useResponsive } from 'states/page'
import { useUser } from 'states/users'

import { Tooltip } from 'components/Tooltip'

import { NavLink } from '../../NavLink'
import { Text } from '../Text'

type Props = {
	name: string,
	url: string,
	allowedRoles?: Array<UserRole>,
	isActive?: boolean,
	renderIcon: () => JSX.Element,
}

export const Link = forwardRef<HTMLAnchorElement, Props>(({ url, renderIcon, name, isActive, allowedRoles = [] }, ref) => {
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
					{renderIcon()}<Text>{name}</Text>
				</NavLink>
			</Tooltip>
		</NextLink>
	)
})
