import type { GetPlaiceholderReturn } from 'plaiceholder'

export type GameImagePlaceholder = GetPlaiceholderReturn['metadata'] & {
	blurDataURL: GetPlaiceholderReturn['base64'],
}
