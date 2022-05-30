import axios from 'axios'

const path = 'https://talent.esteemed.io/'

const buildRoutes = async () => {
  const [r1, r2] = await Promise.all([
    axios.get('https://esteemed-api-97dnt.ondigitalocean.app/jobs').then(res => {
      return res.data.map(job => {
        return { route: '/jobs/' + job.id, payload: job }
      })
    }),
    // TODO Update route to pull internships
    axios.get('https://esteemed-api-97dnt.ondigitalocean.app/jobs').then(res => {
      return res.data.map(internship => {
        return { route: '/internships/' + internship.id, payload: internship }
      })
    })

  ])
  return [...r1, ...r2]
}

export default {

  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Browse Open Jobs',
    titleTemplate: '%s | Esteemed.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Reach new heights in your career with Esteemed. Check out our latest job openings and opportunities.' },
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: 'Browse Open Jobs | Esteemed.io' },
      { hid: 'og:image', property: 'og:image', content: path + '/esteemed-jobs-meta-img.png' },
      { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: path + '/esteemed-jobs-meta-img.png' },
      { hid: 'og:image:type', property: 'og:image:type', content: 'image/png' },
      { hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: 'Esteemed.io' },
      { hid: 'og:description', name: 'og:description', property: 'og:description', content: 'Reach new heights in your career with Esteemed. Check out our latest job openings and opportunities.' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'Esteemed.io' },
      { hid: 'twitter:image', name: 'twitter:image', property: 'twitter:image', content: path + '/esteemed-jobs-meta-img.png' },
      { hid: 'twitter:card', name: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', property: 'twitter:title', content: 'Browse Open Jobs | Esteemed.io' },
      { hid: 'twitter:description', name: 'twitter:description', property: 'twitter:description', content: 'Reach new heights in your career with Esteemed. Check out our latest job openings and opportunities.' }
    ],
    link: [
      { rel: 'icon', type: 'apple-touch-icon', size: '57x57', href: 'https://esteemed.io/apple-icon-57x57.png' },
      { rel: 'icon', type: 'apple-touch-icon', size: '60x60', href: 'https://esteemed.io/apple-icon-60x60.png' },
      { rel: 'icon', type: 'apple-touch-icon', size: '72x72', href: 'https://esteemed.io/apple-icon-72x72.png' },
      { rel: 'icon', type: 'apple-touch-icon', size: '76x76', href: 'https://esteemed.io/apple-icon-76x76.png' },
      { rel: 'icon', type: 'apple-touch-icon', size: '114x114', href: 'https://esteemed.io/apple-icon-114x114.png' },
      { rel: 'icon', type: 'apple-touch-icon', size: '120x120', href: 'https://esteemed.io/apple-icon-120x120.png' },
      { rel: 'icon', type: 'apple-touch-icon', size: '144x144', href: 'https://esteemed.io/apple-icon-144x144.png' },
      { rel: 'icon', type: 'apple-touch-icon', size: '152x152', href: 'https://esteemed.io/apple-icon-152x152.png' },
      { rel: 'icon', type: 'apple-touch-icon', size: '180x180', href: 'https://esteemed.io/apple-icon-180x180.png' },
      { rel: 'icon', type: 'icon', size: '16x16', href: 'https://esteemed.io/favicon-16x16.png' },
      { rel: 'icon', type: 'icon', size: '32x32', href: 'https://esteemed.io/favicon-32x32.png' },
      { rel: 'icon', type: 'icon', size: '96x96', href: 'https://esteemed.io/favicon-96x96.png' }
    ]
  },

  server: {
    port: 8000 // default: 3000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // https://go.nuxtjs.dev/vuetify
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt',
    '@nuxtjs/gtm'
  ],

  gtm: {
    id: 'GTM-WHGM9PZ',
    layer: 'dataLayer',
    scriptId: 'gtm-script',
    scriptDefer: false,
    scriptURL: 'https://www.googletagmanager.com/gtm.js',
    crossOrigin: false,
    noscript: true,
    noscriptId: 'gtm-noscript',
    noscriptURL: 'https://www.googletagmanager.com/ns.html'
  },

  publicRuntimeConfig: {
    gtm: {
      id: 'GTM-WHGM9PZ'
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'App',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'https://esteemed.io/android-icon-36x36.png',
          sizes: '36x36',
          type: 'image/png',
          density: '0.75'
        },
        {
          src: 'https://esteemed.io/android-icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
          density: '1.0'
        },
        {
          src: 'https://esteemed.io/android-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
          density: '1.5'
        },
        {
          src: 'https://esteemed.io/android-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
          density: '2.0'
        },
        {
          src: 'https://esteemed.io/android-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
          density: '3.0'
        },
        {
          src: 'https://esteemed.io/android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          density: '4.0'
        }
      ]
    }
  },

  generate: {
    routes: async () =>
      await buildRoutes(),
    fallback: '404.html'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
