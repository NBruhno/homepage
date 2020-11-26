import { isString, isNumber, has, lowerCase, upperFirst } from 'lodash'

export type Option = {
	title?: string,
	label?: string,
	value?: any,
	options?: Array<Omit<Option, 'options'>>,
	id?: string,
	hint?: string,
	disabled?: boolean,
}

/**
 * A function that attempts to normalize any array of options supplied to it, assuming they are sane.
 * This functionality is generally intended for form fields.
 * @param options - Any options intended to be normalized
 * @example
 * ```tsx
 * const formattedOptions = formatToOptions(options)
 * ```
 */
export const formatToOptions = (options: Array<Option>) => Array.from(options, (option: Option) => {
	if (isString(option) || isNumber(option)) {
		return { label: upperFirst(lowerCase(isString(option) ? option : option.toString())), value: option }
	} else if (has(option, 'title') && has(option, 'id')) {
		return { label: option.title, value: option.id, hint: option.hint, disabled: option.disabled }
	} else if (has(option, 'label') && has(option, 'options')) {
		return { label: option.label, options: option.options, hint: option.hint, disabled: option.disabled }
	} else {
		return { label: option.label || upperFirst(lowerCase(option.value)), value: option.value, hint: option.hint, disabled: option.disabled }
	}
})
