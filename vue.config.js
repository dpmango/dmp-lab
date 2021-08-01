module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/utilities/index.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete("svg")
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/i,
          oneOf: [
            {
              resourceQuery: /raw/,
              use: {
                loader: "raw-loader",
                options: { esModule: false },
              },
            },
            {
              use: {
                loader: "file-loader",
                options: { esModule: false },
              },
            },
          ],
        },
      ],
    },
  },
}
