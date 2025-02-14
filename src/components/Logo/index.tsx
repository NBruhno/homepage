import Image from 'next/image'
import { styled } from 'styled-components'
import type { Stylable } from 'types/Stylable'
import logo from './Logo.svg'

const StyledImage = styled(Image)``

type Props = Stylable

export const Logo = (props: Props) => <StyledImage unoptimized alt='Logo' src={logo} {...props} />
