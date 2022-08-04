/**
 * Get specified element(s) from the DOM
 * @param {string} selector Element selector 
 * @param {boolean} [all=true] true returns all matches, false returns the first match. 
 * @returns {array} Array of Nodes or false if no matches found
 */
 export function get(selector, all = true)  {
	let els = []
	if (all && typeof selector === "string" && selector.replace(/ /g, '') !== "") {
		els = [...document.querySelectorAll(selector)]
	} else {
		els = [document.querySelector(selector)]
	}
	return els.length !== 0 ? els : false
}

/**
 * Alias for get(selector, all) function with all set to true
 * @param {string} selector Element selector  
 * @returns {array} Array of Nodes or false if no matches found
 */
export function getAll(selector) {
	return get(selector, true)
}

/**
 * Checks if element exists
 * @param {string} target CSS Selector for element 
 * @returns {boolean} Returns true if exists, false if not.
 */
export function exists(target) {
	return !!document.querySelector(target)
}

/**
 * Creates a temporary element in the DOM (not visible to user)
 * @param {string} html string of HTML 
 * @returns {HTMLElement|Element} The HTML string as an Element
 */
export function createTempElement(html) {
    let template = document.createElement('template');
    html = html.trim()
    template.innerHTML = html;
    let virtEl = template.content.firstChild;
	return virtEl
}

/**
 * Replaces a specified HTML element with a specified HTML string
 * @param {string|HTMLElement} target The selector/element to be replaced 
 * @param {string} html string of HTML 
 * @returns {HTMLElement|Element} The new element
 */
export function replace(target, html) {
	let tempEl = createTempElement(html)
	target = typeof target === "string" ?  document.querySelector(target) : target
	target.parentNode.replaceChild(tempEl, target)
	return tempEl
}

/**
 * 
 * @param {string} html string of HTML 
 * @param {string} [method=beforeEnd] Method of inserting content Possible Values: ["beforeBegin", "afterBegin", "beforeEnd", "afterEnd"] 
 * @param {string|HTMLElement} target The selector/element to insert the element adjacent to.
 * @returns {HTMLElement|Element} The new element
 */
export function add(html, method = "beforeEnd", target = "body") {
	let tempEl = createTempElement(html)
	target = typeof target === "string" ?  document.querySelector(target) : target
	return target.insertAdjacentElement(method, tempEl)
}

/**
 * Removes a specified element from the page
 * @param {string|HTMLElement} element The selector/element to be removed
 * @returns {boolean} Returns true if element successfully removed, false if not.
 */
export function remove(element) {
	element = typeof element === "string" ?  document.querySelector(element) : element
	try {
		element.remove()
		return true
	} catch (error) {
		return false
	}
}

export const elementManagement = {
	get,
	getAll,
	exists,
	add,
	remove,
}

export default elementManagement