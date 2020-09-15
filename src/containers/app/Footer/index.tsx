import { GitHubIcon, GitLabIcon, EmailIcon, LinkedInIcon } from 'components/Icons'
import { Tooltip } from 'components/Tooltip'

import { Container } from './Container'
import { SocialList } from './SocialList'
import { ListItem } from './ListItem'
import { Link } from './Link'

export const Footer = (props: React.ComponentProps<'footer'>) => (
	<Container {...props}>
		<SocialList>
			<ListItem>
				<Tooltip tip='mail@bruhno.com'>
					<Link href='mailto:mail@bruhno.com' target={undefined} alt='Email'>
						<EmailIcon size={22} />
					</Link>
				</Tooltip>
			</ListItem>
			<ListItem>
				<Tooltip tip='linkedin.com/in/bruhno'>
					<Link href='https://www.linkedin.com/in/bruhno' alt='LinkedIn'>
						<LinkedInIcon size={22} />
					</Link>
				</Tooltip>
			</ListItem>
			<ListItem>
				<Tooltip tip='github.com/NBruhno'>
					<Link href='https://github.com/NBruhno' alt='GitHub'>
						<GitHubIcon size={22} />
					</Link>
				</Tooltip>
			</ListItem>
			<ListItem>
				<Tooltip tip='gitlab.com/Bruhno'>
					<Link href='https://gitlab.com/Bruhno' alt='GitLab'>
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
