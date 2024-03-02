require('dotenv').config()
const axios = require('axios')
const sass = require('sass')
const pkg = require('./package')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: 'universal',

  modern: isProd,

  /**
   * Headers of the page
   */
  head: {
    titleTemplate: title => title ? `${title} - Pröspect` : 'Pröspect',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'og:title', property: 'og:title', content: 'Pröspect' },
      { hid: 'og:image', property: 'og:image', content: `${process.env.BASE_URL}/poster.jpg` },
      { hid: 'og:locale', property: 'og:locale', content: 'fr_CA' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Pröspect' },
      { hid: 'og:description', property: 'og:description', content: pkg.description },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:type', property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: process.env.IMAGES_HOST }
    ]
  },

  /**
   * Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /**
   * Global CSS
   */
  css: [
    '~/assets/scss/global.scss'
  ],

  /**
   * Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/global',
    { src: '~/plugins/client', ssr: false }
  ],

  /**
   * Nuxt.js modules
   */
  modules: [
    // https://github.com/nuxt-community/sentry-module
    '@nuxtjs/sentry',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // https://github.com/nuxt-community/style-resources-module/
    '@nuxtjs/style-resources',
    // https://github.com/nuxt-community/analytics-module
    '@nuxtjs/google-analytics',
    // https://github.com/nuxt-community/sitemap-module
    '@nuxtjs/sitemap'
  ],

  /**
   * Sentry module configuration
   */
  sentry: {
    config: {
      release: `${pkg.name}@${pkg.version}`
    }
  },

  /**
   * Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_ROOT
  },

  /**
   * Analytics module configuration
   */
  'google-analytics': {
    id: process.env.GA_CODE || 'UA-XXXX-YY'
  },

  /**
   * Sitemap module configuration
   */
  sitemap: {
    hostname: 'https://pröspect.art',
    routes () {
      return axios.get(`${process.env.API_ROOT}/all`)
        .then(res => res.data.map(entry => `/gisement/${entry.slug}`))
    }
  },

  /**
   * Style Resources module configuration
   */
  styleResources: {
    scss: ['~/assets/scss/shared.scss']
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    IMAGES_HOST_PROTOCOL: process.env.IMAGES_HOST_PROTOCOL,
    IMAGES_HOST: process.env.IMAGES_HOST,
    IMAGES_PATH: process.env.IMAGES_PATH
  },

  router: {
    middleware: 'navigation'
  },

  serverMiddleware: [
    { path: '/health', handler: '~/server/health.js' }
  ],

  /**
   * Build configuration
   */
  build: {
    loaders: {
        scss: {
            implementation: sass,
	}
    },
    templates: [
      {
        src: './templates/robots.txt',
        dst: '../static/robots.txt',
        options: {
          env: process.env.NODE_ENV
        }
      }
    ]
  }
}
