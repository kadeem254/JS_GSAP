const PATH = require("path");
const MINI_CSS_EXTRACT_PLUGIN = require("mini-css-extract-plugin");
const HTML_WEBPACK_PLUGIN = require("html-webpack-plugin");

module.exports = {
  mode: 'development',

  entry: {
    app: {
      import: "./src/app.js",
    }
  },

  output: {
    path: PATH.resolve( __dirname, "build" ),
    clean: true,
  },

  watch: true,
  watchOptions:{
    aggregateTimeout: 200,
    poll: 1000,
    ignored: '**/node_modules',
  },

  module: {
    rules: [
      // scss
      {
        test: /\.s(a|c)ss$/i,
        use: [
          MINI_CSS_EXTRACT_PLUGIN.loader,
          "css-loader",
          "sass-loader"
        ],
      }
    ]
  },

  plugins: [
    new HTML_WEBPACK_PLUGIN({
      template: "./src/index.html",
      title: "GSAP Bootcamp"
    }),
    new MINI_CSS_EXTRACT_PLUGIN({})
  ]
}