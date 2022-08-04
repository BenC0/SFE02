import config from "../../config.js"
/**
 * Logs a message to the specified test in the window.norman object
 * @param {*} msg The message to be logged, can be any type but strings and objects are most common.
 */
export default function log(msg) {
	let testID = config.id
	let date = new Date
	window.norman[testID].logs.push({
		"msg": msg,
		"id": `${testID}:${window.norman[testID].logs.length}`,
		"time": date.toTimeString(),
		"date": date.toDateString()
	})
}