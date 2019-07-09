module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/sass/_global.scss";`,
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  devServer: {
    disableHostCheck: true,
  },
};
