const webpack = require("webpack");
const path = require("path");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackPluginDefaults = {
  chunks: ["app", "scripts"],
  hash: true,
  scriptLoading: "defer",
  minify: false,
};

module.exports = (options) => ({
  mode: options.mode,
  watch: options.watch || false,
  devtool: options.devtool,
  entry: {
    app: path.join(process.cwd(), "src/app.js"),
    scripts: path.join(process.cwd(), "src/js/scripts.js"),
  },
  // eslint-disable-next-line prefer-object-spread
  output: Object.assign(
    {
      filename: "assets/js/[name].js",
      chunkFilename: "assets/js/[name].chunk.js",
      path: path.resolve(process.cwd(), "dist"),
      publicPath: "./",
    },
    options.output
  ),
  externals: {
    jquery: "jQuery",
  },
  module: {
    rules: [
      {
        test: /\.hbs/,
        use: ["handlebars-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: (file, resourcePath, context) => {
                const relativePath = path.relative(
                  `${context}/src/img`,
                  resourcePath
                );

                return `assets/img/${relativePath}`;
              },
            },
          },
          {
            loader: "cache-loader",
          },
          {
            loader: "image-webpack-loader",
            options: {
              disable: options.mode === "development",
            },
          },
        ],
      },
      {
        test: /(\.jsx|\.js)$/,
        use: ["babel-loader?cacheDirectory=true", "eslint-loader"],
        exclude: /(node_modules)/,
      },
      {
        test: /\.font\.js/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
          {
            loader: "webfonts-loader",
            options: {
              publicPath: "./",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[local]",
              },
              sourceMap: true,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: "vendor",
    },
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      ...HtmlWebpackPluginDefaults,
      template: "src/templates/pages/homepage.hbs",
      filename: "index.html",
    }),
  ].concat(options.plugins),
  resolve: {
    modules: [path.resolve(__dirname, "../..", "src"), "node_modules"],
    extensions: [".js"],
    mainFields: ["browser", "jsnext:main", "main"],
  },
  target: "web",
  performance: options.performance || {},
  devServer: options.devServer || {},
});
