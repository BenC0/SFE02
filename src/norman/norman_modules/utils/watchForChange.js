/**
 * Applies a mutation observer to a specified element 
 * https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 * @param {HTMLElement} [targetNode=null] The HTMLElement to apply the mutation observer to.
 * @param {function} [callback=(mutationsList, observer) => { console.log(mutationsList, observer) }] The callback function to run each time a change is detected.
 * @param {object} [config={ attributes: true, childList: true, subtree: true }] The Mutation Observer configuration object - https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#parameters
 * @param {string} [class_name=observing] The observing class name to apply to the element to prevent duplicate observers.
 */
export default function watchForChange(
		targetNode = null,
		callback = (mutationsList, observer) => { console.log(mutationsList, observer) },
		config = { attributes: true, childList: true, subtree: true },
		class_name = "observing"
	) {
	if (targetNode !== null) {
		if (!targetNode.classList.contains(class_name)) {
			const observer = new MutationObserver(callback);
			targetNode.classList.add(class_name)
			observer.observe(targetNode, config);
		}
	}
}