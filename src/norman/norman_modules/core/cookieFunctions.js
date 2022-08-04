/**
 * Function to set a cookie.
 * @param {string} cname name of cookie
 * @param {string} cvalue Value of cookie
 * @param {int|float} [exdays=30] Expiration time in days
 */
export function set(cname, cvalue, exdays = 30) {
	let d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Function to retrieve a cookie value
 * @param {string} [cname=false] name of cookie 
 * @returns {string} Cookie value, empty string if cname = false
 */
export function get(cname = false) {
	if (cname != false) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
	}
	return "";
}

/**
 * Function to check a cookie exists
 * @param {string} [cookieName=false] Name of the cookie to check for
 * @returns {boolean} True if cookie exists and value is not an empty string, false otherwise
 */
export function exists(cookieName = false) {
	if (!!cookieName) {
		return getCookie(cookieName) !== "";
	}
	return false
}

export default {
	set,
	get,
	exists,
}
