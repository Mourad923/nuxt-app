export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-project',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  auth: {
    strategies: {
		local: {
			endpoints: {
				// these are the API endpoints we created in Express
				login: {
					url: '/api/users/login',
					method: 'post',
					propertyName: 'token'
				},
				logout: true,
				user: {
					url: '/api/users/user',
					method: 'get',
					propertyName: 'user'
				}
			},
			tokenRequired: true,
			tokenType: "Bearer"
		}
    },
    redirect: {
		  login: '/user/login', 
		  logout: '/', //se redirige vers cette page lors de la deconnexion
		  home: '/' //une foi loger il accedera a cette page
    },
    rewriteRedirects: true,
},
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  serverMiddleware: [
    '~/api/index.js'
],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
