const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
  chainWebpack: config => {
    plugins: [
        new GoogleFontsPlugin({
            fonts: [
                {
                  family: "Source Sans Pro"
                },
                {
                  family: "Roboto"
                },
                {
                  family: "Amiko"
                }
            ]
        })
    ]
  },
  "transpileDependencies": [
    "vuetify"
  ],
  devServer : {
    watchOptions: {
      ignored: /node_modules/,
      poll : 1000
    },
    proxy : {
      '/v0' : {
        target: 'https://deploy-preview-101--nandayus-badgio.netlify.app'
      }
    }
  }
}
