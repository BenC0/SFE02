// Config
import config from "./config.js"
// Core Modules
import log from './norman_modules/core/log.js';
import track from './norman_modules/core/tracking.js';
import poll from './norman_modules/core/pollFunction.js';
import cookie from './norman_modules/core/cookieFunctions.js';
import registerTest from './norman_modules/core/registerTest.js';
import elementManagement from './norman_modules/core/elementManagement.js';
// Util Modules
import debounce from './norman_modules/utils/debounce.js';
import isInViewport from './norman_modules/utils/isInViewport.js';
import onMouseLeave from './norman_modules/utils/onMouseLeave.js';
import watchForChange from './norman_modules/utils/watchForChange.js';
import getHighestZIndex from './norman_modules/utils/getHighestZIndex.js';

/**
 * Initialises Norman & registers tests
 * @param {Object} Variant contains name, css, actions, and conditions 
 * @returns {Object} Test ID, test details and run function to poll for test & variant conditions before running variant actions
 */
export function init(Variant) {
	let test = registerTest(Variant.name, {
		css: Variant.css,
		actions: Variant.actions,
		conditions: Variant.conditions,
	})
	let id = config.id
	let run = () => {
		poll(Variant.conditions, _ => {
			document.body.classList.add(`${id}_loaded`)
			Variant.actions()
		}, 0.5)
	}
	return {
		id,
		test,
		run,
	}
}

export const core = {
	log,
	poll,
	track,
	cookie,
	registerTest,
	elementManagement,
}

export const utils = {
	debounce,
	isInViewport,
	onMouseLeave,
	watchForChange,
	getHighestZIndex,
}

export const norman = {
	init,
	core,
	utils,
	config,
}

export default norman 

export {
	log,
	poll,
	track,
	cookie,
	config,
	debounce,
	isInViewport,
	registerTest,
	onMouseLeave,
	watchForChange,
	getHighestZIndex,
	elementManagement,
}