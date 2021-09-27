const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import("webpack").WebpackOptionsNormalized} */
const webpackConfig = {
  entry: "./src/scripts/index.ts",
  mode: "production",
  // devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "browserslist",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    hot: true,
    open: true,
    watchFiles: ["./src/templates/*"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      /** @see https://webpack.js.org/guides/asset-modules/ */
      // Importing assets seems to work out of the box, without
      // the following two rules. I have them here to store the
      // assets in different folders with the generator field.
      {
        test: /\.(jpg|jpeg|png)?$/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.woff2?$/,
        type: "asset",
        generator: {
          filename: "fonts/[name][hash][ext][query]",
        },
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.liquid$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "liquid-loader",
            options: {
              data: {
                page_title: "Liquid with Stylus",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/templates/index.liquid"),
    }),
  ],
};

module.exports = webpackConfig;
