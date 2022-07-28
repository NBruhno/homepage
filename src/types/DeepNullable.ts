export type DeepNullable<T> = {
	[Key in keyof T]: DeepNullable<T[Key]> | null;
}
