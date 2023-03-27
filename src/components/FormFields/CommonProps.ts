export type CommonProps<Path> = {
	/** The displayed name of a field. This does not affect the submitted result. */
	label: string,
	/** Name of the field. Usually provided by `fieldProps()` if matched with a schema. */
	name: Path,
	/** A small text below the field label, intended to assist with extra information. */
	hint?: string,
	/** Defaults to `false`. This will disable all interaction with the field and exempt it from the submission. */
	isDisabled?: boolean,
	/** Defaults to `false`. This will disable all interaction with the field but will included in submission. */
	isReadOnly?: boolean,
	/** Defaults to `false`. The field will be required for submission. This is usually controlled by the schema. */
	isRequired?: boolean,
	/** Defaults to `true`. If a field is not required, a small hint text will say "(Optional)" next to the label. */
	showOptionalHint?: boolean,
	/** Defaults to `true`. Determines wether or not the field will fill its container horizontally. */
	isFullWidth?: boolean,
}

export type CommonInputProps<Path> = CommonProps<Path> & {
	/** Defaults to `false`. If enabled, the field will be automatically focused on mount. */
	shouldAutofocus?: boolean,
	/** A text that will shown inside the input field as long as the field has no other value to display. */
	placeholder?: string,
}

export type SelectOption = {
	/** The displayed name of the option. This does not affect the submitted result. */
	label: string,
	/** The value of the option. This is the value that will be reflected in the submission and attached to the `name` of the field. */
	value: boolean | number | string,
}

export type CommonSelectProps<Path> = CommonInputProps<Path> & {
	/** `options` are all the possible values of a select field that the use can choose from. */
	options: Array<SelectOption>,
	/** Defaults to `false`. Shows a loading indicator, commonly used to show that the options are loading. */
	isLoading?: boolean,
	/** Defaults to `40`. How many options are visible at a time in the menu. This is to avoid having to implement a virtualized list. */
	maxNumberOfOptionsVisible?: number,
}
