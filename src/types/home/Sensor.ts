import type { SensorType } from './SensorType'

export type Sensor = {
	id: string,
	name: string,
	lastChanged: string,
	lastUpdated: string,
	context: {
		id: string,
		userId: string | null,
		parentId: string | null,
	},
} & ({
	type: SensorType.Battery,
	amount: number,
	unit: string,
} | {
	type: SensorType.Door | SensorType.Window,
	isOpen: boolean,
} | {
	type: SensorType.Download | SensorType.Upload,
	amount: number,
	unit: string,
} | {
	type: SensorType.Humidity,
	amount: number,
	unit: string,
} | {
	type: SensorType.Ping,
	amount: number,
	unit: string,
} | {
	type: SensorType.Pressure,
	amount: number,
	unit: string,
} | {
	type: SensorType.Running,
	isRunning: boolean,
} | {
	type: SensorType.Temperature,
	amount: number,
	unit: string,
} | {
	type: SensorType.Unknown,
	amount: unknown,
})
