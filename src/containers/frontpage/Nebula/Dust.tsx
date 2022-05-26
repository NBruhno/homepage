import type { Mesh, Texture } from 'three'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

type DustProps = {
	texture: Texture,
	opacity: number,
	position: [x: number, y: number, z: number],
	rotation: [x: number, y: number, z: number],
	shouldAnimate?: boolean,
}

export const Dust = ({ texture, opacity, position, shouldAnimate = true, rotation }: DustProps) => {
	const ref = useRef<Mesh>()
	useFrame(() => {
		if (ref.current && shouldAnimate) {
			ref.current.rotation.z -= 0.0001
		}
	})

	return (
		// @ts-expect-error The ref is valid
		<mesh position={position} rotation={rotation} ref={ref}>
			<planeBufferGeometry args={[500, 500]} />
			<meshLambertMaterial map={texture} opacity={Math.max(Math.min(opacity, 0.9), 0.4)} transparent />
		</mesh>
	)
}
