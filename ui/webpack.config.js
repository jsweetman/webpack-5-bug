var webpack = require("webpack");
var path = require("path");

// variables
var isProduction = process.argv.indexOf("-p") >= 0;
var sourcePath = path.join(__dirname, "./src");
var outPath = path.join(__dirname, "./dist");

// plugins
var HtmlWebpackPlugin = require("html-webpack-plugin");

var tsLoader = {
  loader: "ts-loader",
  options: {
    configFile: "tsconfig.json",
    transpileOnly: true,
  },
};

var plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
    DEBUG: false,
  }),
  new webpack.ProvidePlugin({
    process: "process/browser",
    Buffer: ["buffer", "Buffer"],
  }),
  new HtmlWebpackPlugin({
    template: "assets/dev/index.html",
  }),
];

var config = {
  context: sourcePath,
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    app: "./app/index.tsx",
  },
  output: {
    path: outPath,
    filename: isProduction
      ? "file.[name].[contenthash].js"
      : "file.[name].[fullhash].js",
    chunkFilename: isProduction
      ? "chunk.[name].[contenthash].js"
      : "chunk.[name].[fullhash].js",
    publicPath: "/",
  },
  target: "web",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".pcss"],
    mainFields: ["module", "browser", "main"],
    fallback: {
      fs: false,
      net: false,
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      path: require.resolve("path-browserify"),
      vm: require.resolve("vm-browserify"),
    },
  },
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: isProduction ? tsLoader : ["babel-loader", tsLoader],
      },
    ],
  },
  plugins: plugins,
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: {
      warnings: false,
    },
  },
};

module.exports = config;
