import Vue from 'vue'
import anime from 'animejs'
import MobileDetect from 'mobile-detect'

export default ({ app, env, req }, inject) => {
  Vue.prototype.$anime = anime
  const { IMAGES_HOST_PROTOCOL, IMAGES_HOST, IMAGES_PATH } = env
  Vue.prototype.$imagesRoot = `${IMAGES_HOST_PROTOCOL}:${IMAGES_HOST}${IMAGES_PATH}`
  // Detect device
  const userAgent = process.server ? req.headers['user-agent'] : window.navigator.userAgent
  const mobileDetect = new MobileDetect(userAgent)
  inject('isMobile', !!mobileDetect.mobile())
}
