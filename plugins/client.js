import Vue from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'
import { seamless } from 'seamless-scroll-polyfill/dist/seamless.esm.js'
import VueWindowSize from 'vue-window-size'

// https://github.com/Akryum/vue-observe-visibility
Vue.directive('observe-visibility', ObserveVisibility)

// IntersectionObserver polyfill
require('intersection-observer')

// vh fix for Safari Mobile
require('viewport-units-buggyfill').init()

// scrollIntoView polyfill
seamless()

// https://github.com/mya-ake/vue-window-size
Vue.use(VueWindowSize)

export default ({ store, app }) => {
  app.router.afterEach(() => {
    store.dispatch('closeMenu')
  })
}
