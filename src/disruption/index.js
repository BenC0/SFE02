import "./index.css"
import { TestElement, getHighestZIndex, cookie } from "../norman"

export default class Disruption {
    constructor(options, variant) {
        this.id = options.id
        this.variant = variant
        this.cookie_name = `${this.id}_disruption`
        this.alt = options.alt
        this.src = options.src
        this.link = options.link
        this.method = options.method
        this.target = options.target || "body"
        this.breakpoint = this.breakpoint || 768

        this._create_html()
        this.element = new TestElement(this.html)
        this.element._insert(this.target)
        this._hide(true)

        this.close_btns = this.element._find(".close")
        this.close_btns.forEach(close_btn => {
            close_btn.node.addEventListener("click", e => {
                this._hide()
            })
        })

        console.warn(this)
    }

    _hasnt_user_seen_disruption() {
        return cookie.get(this.cookie_name) == ""
    }

    _remember_user_seen_disruption() {
        cookie.set(this.cookie_name, true, 1)
    }

    init() {
        this.variant.log(`Initialising Disruption: ${this.id}`)
        if(this.method == "exit-intent") {
            this._watch_exit_intent()
        } else if (!!this.method.match("delay:")) {
            this.delay = this.method.match(/[0-9]/g)
            if (this.delay.length == 0) {
                this.delay = 3000
            } else {
                this.delay = parseInt(this.delay.join("")) || 3000
            }
            this.variant.log(`Disruption Delay: ${this.delay}`)
            this._trigger_after_delay()
        }
        this.variant.log(`Disruption Initialised: ${this.id}`)
    }

    _trigger_after_delay() {
        window.setTimeout(e => {
            this._show()
        }, this.delay)
    }

    _watch_exit_intent() {
        let handle_mousemove = e => {
            if (!!e.clientY && e.clientY <= 100) {
                console.warn("Disruption Triggered")
                this._show()
                window.removeEventListener("mousemove", handle_mousemove)
            }
        }
        window.addEventListener("mousemove", handle_mousemove)
    }

    _show() {
        this.variant.log(`Disruption Display Check: ${this._hasnt_user_seen_disruption()}`)
        if(this._hasnt_user_seen_disruption()) {
            this.element._class("show")
            this.element._class("hide", false)
            this.variant.track_event("Disruption Displayed")
            this._remember_user_seen_disruption()
        }
    }

    _hide(first=false) {
        this.element._class("hide")
        this.element._class("show", false)
        if(!first) {
            this.variant.track_event("Disruption Hidden")
        }
    }

    _create_html() {
        this.html = `<section class="disruption hide" style="z-index: ${getHighestZIndex() + 1};" disruption="${this.id}">
            <div class="background close"></div>
            <div class="content">
                <span class="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <g id="Times" transform="translate(0 0)">
                            <path id="times-light" d="M9.7,104l5.128-5.128,1.058-1.058a.4.4,0,0,0,0-.566l-1.132-1.132a.4.4,0,0,0-.566,0L8,102.3,1.815,96.117a.4.4,0,0,0-.566,0L.117,97.249a.4.4,0,0,0,0,.566L6.3,104,.117,110.186a.4.4,0,0,0,0,.566l1.132,1.132a.4.4,0,0,0,.566,0L8,105.7l5.128,5.128,1.058,1.058a.4.4,0,0,0,.566,0l1.132-1.132a.4.4,0,0,0,0-.566Z" transform="translate(0 -96)" />
                        </g>
                    </svg>
                </span>
                <a href="${this.link}">
                    <picture>
                        <source srcset="${this.src.desktop}"
                                media="(min-width: ${this.breakpoint}px)">
                        <img src="${this.src.mobile}" alt="${this.alt}" />
                    </picture>
                </a>
            </div>
        </section>`
    }
}