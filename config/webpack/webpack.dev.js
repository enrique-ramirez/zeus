const path = require("path");

const plugins = [];

module.exports = require("./webpack.common")({
  mode: "development",
  devtool: "source-map",
  plugins,
  performance: {
    hints: false,
  },
  watch: true,
  devServer: {
    contentBase: path.join(process.cwd(), "dist"),
    watchContentBase: true,
    open: true,
    port: 3333,
    publicPath: "/",
  },
});
