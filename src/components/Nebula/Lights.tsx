import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

const frameRate = 1000 / 10 // 10 FPS

export const Lights = () => {
	const { invalidate } = useThree()

	useEffect(() => {
		const interval = setInterval(() => {
			invalidate()
		}, frameRate)
		return () => clearInterval(interval)
	}, [])

	return (
		<>
			<ambientLight color={0x555555} />
			<directionalLight color={0xff8c19} position={[0, 0, 1]} />
			<pointLight args={[0xff8c00, 45000, 550, 1.3]} position={[200, 300, 100]} />
			<pointLight args={[0xa86551, 25000, 550, 1.3]} position={[-100, 100, -300]} />
			<pointLight args={[0xbd0f0f, 40000, 550, 1.2]} position={[100, 300, 100]} />
			<pointLight args={[0x3677ac, 70000, 550, 1.4]} position={[300, 300, 200]} />
			<pointLight args={[0x3d48bf, 60000, 350, 1]} position={[100, 300, 300]} />
		</>
	)
}
