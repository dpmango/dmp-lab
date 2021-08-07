module.exports = {
  devServer: {
    host: "localhost",
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/utilities/index.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete("svg")

    if (process.env.NODE_ENV === "development") {
      config.output.filename("[name].[hash].js").end()
    }
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
