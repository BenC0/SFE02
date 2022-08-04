import config from "../../config.js"
/**
 * Registers a test in the window.norman object for logging and debugging purposes
 * @param {object} variant An object of various details specific to the variant that has loaded. A common use case is the variant name/id 
 * @param {object} [extraDetails={}] An object of additional details. Does not need to be variant specific. Defaults to an empty object. 
 * @returns {object} Returns the stored test from the window.norman object
 */
export default function registerTest(variant, extraDetails = {}) {
	let testID = config.id
	for (const property in extraDetails) {
		config[property] = extraDetails[property]
	}
	window.norman = window.norman || []
	window.norman[testID] = {
		variant,
		logs: [],
		config,
	}

	return window.norman[testID]
}