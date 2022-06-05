import type { PointLight } from 'three'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

const frameRate = 1000 / 10

export const Lights = () => {
	const ref = useRef<PointLight>()
	const { invalidate } = useThree()

	useEffect(() => {
		const interval = setInterval(() => {
			invalidate()
		}, frameRate)
		return () => clearInterval(interval)
	}, [])

	useFrame(async () => {
		// if (ref.current) {
		// 	if (Math.random() > 0.98 || ref.current.power > 100) {
		// 		if (ref.current.power < 100) {
		// 			ref.current.position.set(
		// 				Math.random() * 400,
		// 				300 + Math.random() * 200,
		// 				Math.random() * 100 + 300,
		// 			)
		// 		}
		// 		ref.current.power = 50 + Math.random() * 500
		// 	}
		// }
	})

	return (
		<>
			<ambientLight color={0x555555} />
			<directionalLight color={0xff8c19} position={[0, 0, 1]} />
			{/* Stationary ambience lights */}
			<pointLight args={[0xff8c00, 50, 450, 1.3]} position={[200, 300, 100]} />
			<pointLight args={[0xbd0f0f, 50, 450, 1.2]} position={[100, 300, 100]} />
			<pointLight args={[0x3677ac, 50, 450, 1.4]} position={[300, 300, 200]} />
			<pointLight args={[0x3d48bf, 50, 350, 1]} position={[100, 300, 300]} />
			{/* Flashing effect lights */}
			{/* @ts-expect-error The ref is valid */}
			<pointLight args={[0xa8d5ff, 30, 500, 3]} position={[200, 300, 100]} ref={ref} />
		</>
	)
}
