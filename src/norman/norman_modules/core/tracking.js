import config from "../../config.js"
import log from "./log.js"
/**
 * Function to push events to dataLayer
 * @param {string} variant Variation ID/Name
 * @param {string} eventAction Event action to be tracked
 * @param {boolean} impressionEvent Flags where to track event as impression and use custom dimension.
 */
export function pushToDataLayer(variant = "", eventAction = "", impressionEvent = false) {
	if (variant !== "" && eventAction !== "") {
		window.dataLayer = window.dataLayer || []
		let eventObject = {
			'event': 'CRO_Test_Event',
			'eventAction': `${eventAction}`,
			'eventLabel': `${config.id}-${variant}`,
		}

		if (impressionEvent !== false && config.tracking.google_analytics.dimension !== "") {
			eventObject = {
				'event': 'CRO_Test_Impression',
				'testID': config.id,
				'dimension': config.tracking.google_analytics.dimension,
				'variation': variant,
			}
		}
        log({
            "type": "Event pushed to dataLayer",
            eventObject
        })
		window.dataLayer.push(eventObject)
	}
}

/**
 * Function for sending a hotjar impression evnet
 * @param {string} variant Variation ID/Name 
 */
export function hotjar_impression_event(variant) {
	log(`Sending event to Hotjar: ${config.id}-${variant.replace(/ |\./g, "-")}`)
	window.hj=window.hj||function(){(hj.q=hj.q||[]).push(arguments)};
	window.hj('event', `${config.id}-${variant.replace(/ |\./g, "-")}`);
}

/**
 * Shorthand/alias function for tracking events 
 * @param {string} variant Variation ID/Name
 * @param {string} action Event action to be tracked
 * @param {boolean} [impression=false] Flags where to track event as impression or not.
 */
export default function track(variant, action, impression = false) {
    pushToDataLayer(variant, action, impression)
	if(impression && config.tracking.hotjar.heatmaps) {
		hotjar_impression_event(variant)
	}
}