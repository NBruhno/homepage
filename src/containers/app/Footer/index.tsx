import type { ComponentPropsWithoutRef } from 'react'

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
			<ListItem>
				<Tooltip tip='mail@bruhno.com'>
					<Link isTransparent={isTransparent} href='mailto:mail@bruhno.com' target={undefined} aria-label='Send an email to mail@bruhno.com'>
						<MailIcon size={22} />
					</Link>
				</Tooltip>
			</ListItem>
			<ListItem>
				<Tooltip tip='linkedin.com/in/bruhno'>
					<Link isTransparent={isTransparent} href='https://www.linkedin.com/in/bruhno' aria-label='LinkedIn profile'>
						<LinkedInIcon size={22} />
					</Link>
				</Tooltip>
			</ListItem>
			<ListItem>
				<Tooltip tip='github.com/NBruhno'>
					<Link isTransparent={isTransparent} href='https://github.com/NBruhno' aria-label='GitHub profile'>
						<GitHubIcon size={22} />
					</Link>
				</Tooltip>
			</ListItem>
			<ListItem>
				<Tooltip tip='gitlab.com/Bruhno'>
					<Link isTransparent={isTransparent} href='https://gitlab.com/Bruhno' aria-label='GitLab profile'>
						<GitLabIcon size={22} />
					</Link>
				</Tooltip>
			</ListItem>
		</SocialList>
		<div css={{ opacity: 0.7 }}>
			<small>
				Copyright © 2010 Bruhno. All rights reserved.
			</small>
		</div>
	</Container>
)
