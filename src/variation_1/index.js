import variationCSS from "./index.css";
import norman from "../norman/index.js"

function init() {
    norman.core.log("Variation 1")
    norman.core.track(Variant.name, "Loaded", true)
}

const Variant = {
    name: "Variation 1",
    css: variationCSS,
    conditions: () => {
        let conditions = []
        conditions.push(true)
        norman.core.log({message: `Polling: Conditions`, conditions})
        let result = conditions.every(a => a)
        norman.core.log({message: `Polling: Result`, result})
        return result
    },
    actions: init,
}

let nVariant = norman.init(Variant)
nVariant.run()