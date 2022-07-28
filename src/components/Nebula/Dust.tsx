import type { Mesh } from 'three'

import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import random from 'lodash/random'
import { useRef } from 'react'

type DustProps = {
	opacity: number,
	position: [x: number, y: number, z: number],
	rotation: [x: number, y: number, z: number],
	shouldAnimate?: boolean,
}

export const Dust = ({ opacity, position, shouldAnimate = true, rotation }: DustProps) => {
	const ref = useRef<Mesh>()
	const texture = useTexture('./images/smoke.png')
	useFrame(() => {
		if (ref.current && shouldAnimate) {
			ref.current.rotation.z -= random(0.6, 2) / 1000
		}
	})

	return (
		// @ts-expect-error The ref is valid
		<mesh position={position} rotation={rotation} ref={ref}>
			<planeBufferGeometry args={[500, 500]} />
			<meshLambertMaterial map={texture} opacity={opacity} transparent />
		</mesh>
	)
}
