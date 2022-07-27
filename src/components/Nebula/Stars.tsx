import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { Color, Vector3, Spherical, AdditiveBlending, ShaderMaterial } from 'three'

class StarfieldMaterial extends ShaderMaterial {
	constructor() {
		super({
			uniforms: {
				time: {
					value: 0.0,
				},
				fade: {
					value: 1.0,
				},
			},
			vertexShader:
      /* glsl */
      `
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(mvPosition.x + 2.0 * time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,
			fragmentShader:
      /* glsl */
      `
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <encodings_fragment>
      }`,
		})
	}
}

type Props = {
	radius?: number,
	depth?: number,
	count?: number,
	factor?: number,
	saturation?: number,
	shouldFade?: boolean,
	speed?: number,
}

const genStar = (radius: number) => new Vector3().setFromSpherical(new Spherical(
	radius,
	Math.acos(1 - Math.random() * 2),
	Math.random() * 2 * Math.PI,
))

export const Stars = ({
	radius = 500,
	depth = 50,
	count = 5000,
	saturation = 0,
	factor = 4,
	shouldFade = false,
	speed = 1,
}: Props) => {
	const material = useRef<{ uniforms: { time: { value: number } } }>()
	const [position, color, size] = useMemo(() => {
		const positions: Array<number> = []
		const colors: Array<number> = []
		const sizes = Array.from({
			length: count,
		}, () => (0.5 + 0.5 * Math.random()) * factor)
		const color = new Color()
		let r = radius + depth
		const increment = depth / count

		Array.from({ length: count }).forEach((_, index) => {
			r -= increment * Math.random()
			positions.push(...genStar(r).toArray())
			color.setHSL(index / count, saturation, 0.9)
			colors.push(color.r, color.g, color.b)
		})

		return [new Float32Array(positions), new Float32Array(colors), new Float32Array(sizes)]
	}, [count, depth, factor, radius, saturation])
	useFrame((state) => {
		if (material.current) {
			material.current.uniforms.time.value = state.clock.getElapsedTime() * speed
		}
	})
	const [starfieldMaterial] = useState(() => new StarfieldMaterial())

	return (
		<points>
			<bufferGeometry>
				<bufferAttribute attach='attributes-position' args={[position, 3]} />
				<bufferAttribute attach='attributes-color' args={[color, 3]} />
				<bufferAttribute attach='attributes-size' args={[size, 1]} />
				<primitive
					ref={material}
					object={starfieldMaterial}
					attach='material'
					blending={AdditiveBlending}
					uniforms-fade-value={shouldFade}
					transparent
					vertexColors
				/>
			</bufferGeometry>
		</points>
	)
}
