import "./index.css"
import test_config from "../test_config.js"
import Disruption from "../disruption/index.js"
import { Variant, TestElement, TestElements, watchForChange } from "../norman"

const conditions = _ => {
    let conditions = [
        !!document.querySelector(`body`)
    ]
    if(!!document.querySelector('.results-category-selector__title')) {
        if (!!document.querySelector('.results-category-selector__title').textContent.match(/dry kitten food/gi)) {
            conditions.push(true)
        } else {
            conditions.push(false)
        }
    } else {
        conditions.push(false)
    }
    return conditions.every(a => a)
}

function action() {
    this.log("Action loaded")

    const disruption_config = {
        id: test_config.id,
        alt: "100% for their best first year, science did that. Shop now. Hill Science Plan, Veterinarian Recommended.",
        target: "body",
        method: "delay:5000",
        link: "https://www.petsathome.com/shop/en/pets/cat/kitten-food/dry-kitten-food?currentPage=1&pageSize=24&orderBy=1&Brand=%22Hill%27s%20Science%20Plan%22",
        src: {
            mobile: "https://editor-assets.abtasty.com/47297/62eb86005cb831659602432.png",
            desktop: "https://editor-assets.abtasty.com/47297/62eb85e84a08a1659602408.jpg",
        },
    }

    const popup = new Disruption(disruption_config, this)

    popup.init()
}

function fallback() {
    this.log("Test can't run, fallback loaded", true)
}

const variation = new Variant(test_config, "Variation 1", conditions, action, fallback)
variation.run()