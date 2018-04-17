import { Counter } from 'models/counter'
import { Stars } from 'models/stars'

export interface InterfaceStore {
	counter: Counter
	stars: Stars
}
