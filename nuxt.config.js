export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ISEF',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    { path: '~/components/globals/', prefix: 'global' },
    { path: '~/components/modals/', prefix: 'modal' },
    { path: '~/components/forms/', prefix: 'form' },
    { path: '~/components/tables/', prefix: 'table' },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL,
    credentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-nested': {},
      },
    },
  },

  // Configuraciones para paquete AUTH-LARAVEL
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      home: '/inicio',
    },
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        // api/api porque en produccion el back esta bajo la URL /api
        url: `${process.env.API_BASE_URL}${
          process.env.NODE_ENV == 'production' ? '/api/api' : ''
        }`,
        endpoints: {
          csrf: {
            url: '/sanctum/csrf-cookie',
          },
          login: {
            url: '/login',
          },
          user: {
            url: '/user',
          },
          logout: {
            url: '/logout',
          },
        },
        cookie: {
          name: 'XSRF-TOKEN',
        },
      },
    },
  },
};
