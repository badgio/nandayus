module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer : {
    watchOptions: {
      ignored: /node_modules/,
      poll : 1000
    }
  }
}