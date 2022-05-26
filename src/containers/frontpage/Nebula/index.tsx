import { PerspectiveCamera } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react'
import { TextureLoader } from 'three'

import { Dust } from './Dust'
import { Lights } from './Lights'
import { Stars } from './Stars'

export const Nebula = () => {
	const dustTexture = useLoader(TextureLoader, './images/smoke.png')
	const movingClouds = useMemo(() => Array.from({ length: 40 }).map(() => ({
		position: {
			x: Math.random() * 800 - 400,
			y: 500,
			z: Math.random() * 500 - 500,
		},
		rotation: {
			x: 1.16,
			y: -0.12,
			z: Math.random() * 2 * Math.PI,
		},
		opacity: Math.random(),
	})), [])
	const stationaryClouds = useMemo(() => Array.from({ length: 40 }).map(() => ({
		position: {
			x: Math.random() * 800 - 400,
			y: 500,
			z: Math.random() * 5000 - 500,
		},
		rotation: {
			x: 1.16,
			y: -0.12,
			z: Math.random() * 2 * Math.PI,
		},
		opacity: Math.random(),
	})), [])

	return (
		<>
			<fogExp2 args={[0x03544e, 0.001]} />
			<color attach='background' args={[0x03544e]} />
			<Lights />
			<PerspectiveCamera makeDefault fov={60} position={[1, 0, 0]} rotation={[1.16, -0.12, 0.27]} near={1} far={1000} />
			{movingClouds.map(({ position, rotation, opacity }) => (
				<Dust
					texture={dustTexture}
					position={[position.x, position.y, position.z]}
					rotation={[rotation.x, rotation.y, rotation.z]}
					opacity={opacity}
				/>
			))}
			{stationaryClouds.map(({ position, rotation, opacity }) => (
				<Dust
					texture={dustTexture}
					position={[position.x, position.y, position.z]}
					rotation={[rotation.x, rotation.y, rotation.z]}
					opacity={opacity}
					shouldAnimate={false}
				/>
			))}
			<Stars count={4000} radius={350} saturation={0.1} shouldFade />
			<Stars count={10000} depth={250} radius={400} shouldFade />
			<Stars count={50000} depth={500} factor={10} shouldFade saturation={1} />
		</>
	)
}
