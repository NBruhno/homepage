import type { Light } from './Light'

export type LightCollection = {
	lights: Array<Extract<Light, { type: 'light' }>>,
	rooms: Array<Extract<Light, { type: 'room' }>>,
}
