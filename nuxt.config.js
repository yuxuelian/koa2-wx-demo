module.exports = {
  mode: 'universal',
  server: {
    port: 3999,
    host: '0.0.0.0'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/test'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  // 跨域代理
  axios: {
    prefix: '/',
    proxy: true // Can be also an object with default options
  },
  proxy: {
    // 已 proxy 开头的 url 请求使用代理
    '/proxy': {
      target: 'http://118.126.108.24:3000/',
      pathRewrite: {'^/proxy/': ''}
    }
  },
  /*
  ** Build configuration
  */
  build: {
    analyze: false,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
