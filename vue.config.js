module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/styles/_global.scss";`
      },
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
