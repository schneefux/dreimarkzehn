import path from 'path'

const apiUrl = (process.env.API_URL || 'http://localhost:3001').replace(/\/$/, ''); // replace trailing slash
const cubeUrl = (process.env.CUBE_URL || 'http://localhost:3002').replace(/\/$/, '');

export default {
  telemetry: false,
  modern: process.env.NODE_ENV == 'development' ? false : 'server',

  head: {
    titleTemplate: '%s - Drei Mark Zehn',
  },

  meta: {
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
    name: 'Drei Mark Zehn',
    description: '',
    author: 'schneefux',
    theme_color: '#facc15', // yellow-400
  },

  pwa: {
    manifest: {
      name: 'Drei Mark Zehn',
      short_name: 'Drei Mark',
      description: '',
      theme_color: '#facc15', // yellow-400
    },
    workbox: {
      // FIXME depends on env variables being available at build time
      // - use *.brawltime.ninja as urlPattern instead
      runtimeCaching: [{
        urlPattern: apiUrl + '/.*',
        handler: 'networkFirst',
      }, {
        urlPattern: cubeUrl + '/.*',
        handler: 'networkFirst',
      }],
      // prefix all cache keys with release id
      // write release id to a custom option
      // -> sw.js changes on deploy
      cacheNames: {
        prefix: 'dmz@' + process.env.GIT_REV,
      },
      release: 'dmz@' + process.env.GIT_REV,
      // custom service worker with cache busting on release
      swTemplate: process.env.NODE_ENV == 'development' ? undefined : path.resolve(__dirname, 'static/sw-template.js'),
    },
  },

  loading: { color: '#dc2626' }, // red-600

  css: [
    '~/assets/css/tailwind.css',
  ],

  plugins: [
    { src: '~/plugins/klicker' },
    { src: '~/plugins/http', mode: 'client' },
  ],

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/http',
    '@nuxtjs/pwa',
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxt/postcss8',
    '@nuxtjs/fontawesome',
    '@nuxtjs/google-fonts',
    '@nuxtjs/composition-api/module',
  ],

  components: [ {
    path: '~/components',
    pathPrefix: false,
    loader: true, // https://github.com/nuxt/components/issues/164
  } ],

  router: {
    prefetchLinks: false,
  },

  env: {
    branch: process.env.BRANCH || '',
    release: (process.env.GIT_REV || 'dev').slice(0, 6),
  },
  publicRuntimeConfig: {
    apiUrl,
    cubeUrl,
    cubeSecret: (process.env.CUBE_SECRET || ''),
  },

  build: {
    loaders: {
      css: {
        // https://github.com/nuxt/postcss8/issues/24
        modules: process.env.NODE_ENV == 'development' ? false : undefined,
      },
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-color-function': {},
        'tailwindcss': {},
        'autoprefixer': {},
      },
    },
    // https://github.com/nuxt/nuxt.js/issues/9221
    transpile: ['vega-lite', 'd3-format', '@schneefux/klicker', 'latlon-geohash'],
  },

  fontawesome: {
    // reduce size
    useLayers: false,
    useLayersText: false,
    addCss: true,
  },

  i18n: {
    locales: [{
      code: 'de',
      iso: 'de-DE',
      file: 'index.js',
    }],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'de',
    detectBrowserLanguage: {
      redirectOn: 'root',
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    vueI18n: {
      fallbackLocale: 'de',
    },
  },

  googleFonts: {
    families: {
      Roboto: true,
    },
    display: 'swap',
    download: true,
    subsets: 'latin',
  },

  serverMiddleware: [
    { path: '/klicker', handler: '~/server-middleware/klicker.ts' },
  ],
}
