/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * @param {function} func The function to be called 
 * @param {integer} wait The millisecodns to wait for after this function stops being called
 * @param {boolean} immediate If true, the funciton will be triggered on the leading edge instead of the trailing 
 */
export default function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};