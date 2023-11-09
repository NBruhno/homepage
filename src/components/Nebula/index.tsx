import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { random } from 'lodash'
import { Suspense, useMemo } from 'react'

import { Dust } from './Dust'
import { Lights } from './Lights'
import { Stars } from './Stars'
import { Wrapper } from './Wrapper'

export const Nebula = () => {
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
		opacity: random(0.4, 0.9),
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
		opacity: random(0.4, 0.9),
	})), [])

	return (
		<Wrapper>
			<Canvas frameloop='demand'>
				<Suspense fallback={null}>
					<fogExp2 args={[0x03544e, 0.2]} />
					<PerspectiveCamera makeDefault fov={60} position={[1, 0, 0]} rotation={[1.16, -0.12, 0.27]} near={1} far={1000} />
					<Lights />
					{movingClouds.map(({ position, rotation, opacity }, index) => (
						<Dust
							position={[position.x, position.y, position.z]}
							rotation={[rotation.x, rotation.y, rotation.z]}
							opacity={opacity}
							key={index}
						/>
					))}
					{stationaryClouds.map(({ position, rotation, opacity }, index) => (
						<Dust
							position={[position.x, position.y, position.z]}
							rotation={[rotation.x, rotation.y, rotation.z]}
							opacity={opacity}
							shouldAnimate={false}
							key={index}
						/>
					))}
					<Stars count={1000} radius={400} saturation={0.1} shouldFade />
					<Stars count={1000} depth={250} radius={400} shouldFade />
					<Stars count={50000} depth={500} factor={10} shouldFade saturation={1} />
				</Suspense>
			</Canvas>
		</Wrapper>
	)
}
