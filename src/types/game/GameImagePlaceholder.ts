import type { IGetPlaiceholderReturn } from 'plaiceholder'

export type GameImagePlaceholder = IGetPlaiceholderReturn['img'] & {
	blurDataURL: IGetPlaiceholderReturn['base64'],
}
