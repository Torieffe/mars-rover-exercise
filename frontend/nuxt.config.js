import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    //Default head for all the pages
    title: 'Mars rover', //Default title of the pages
    htmlAttrs: {
      lang: 'en', //Language of the page
    },
    meta: [
      //Page metadata
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }], //Icon for the pages
  },

  //Modules to add the the site
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios'],

  axios: {
    baseURL: 'http://localhost:3001/', //Default URL for the APIs
  },

  vuetify: {
    //Theme settings for the styling
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
}
