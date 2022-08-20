import type { ComponentPropsWithoutRef } from 'react'

import { getYear } from 'date-fns'

import { GitHubIcon, GitLabIcon, MailIcon, LinkedInIcon } from 'components/Icons'
import { Tooltip } from 'components/Tooltip'

import { Container } from './Container'
import { Link } from './Link'
import { ListItem } from './ListItem'
import { SocialList } from './SocialList'

type Props = ComponentPropsWithoutRef<'footer'> & {
	isTransparent: boolean,
}

export const Footer = ({ isTransparent, ...rest }: Props) => (
	<Container isTransparent={isTransparent} {...rest}>
		<SocialList>
			<Tooltip tip='mail@bruhno.com'>
				<ListItem>
					<Link isTransparent={isTransparent} href='mailto:mail@bruhno.com' target={undefined} aria-label='Send an email to mail@bruhno.com'>
						<MailIcon size={22} />
					</Link>
				</ListItem>
			</Tooltip>
			<Tooltip tip='linkedin.com/in/bruhno'>
				<ListItem>
					<Link isTransparent={isTransparent} href='https://www.linkedin.com/in/bruhno' aria-label='LinkedIn profile'>
						<LinkedInIcon size={22} />
					</Link>
				</ListItem>
			</Tooltip>
			<Tooltip tip='github.com/NBruhno'>
				<ListItem>
					<Link isTransparent={isTransparent} href='https://github.com/NBruhno' aria-label='GitHub profile'>
						<GitHubIcon size={22} />
					</Link>
				</ListItem>
			</Tooltip>
			<Tooltip tip='gitlab.com/Bruhno'>
				<ListItem>
					<Link isTransparent={isTransparent} href='https://gitlab.com/Bruhno' aria-label='GitLab profile'>
						<GitLabIcon size={22} />
					</Link>
				</ListItem>
			</Tooltip>
		</SocialList>
		<div css={{ opacity: 0.7 }}>
			<small>
				Copyright © {getYear(new Date())} Bruhno. All rights reserved.
			</small>
		</div>
	</Container>
)
