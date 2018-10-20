const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html"
});

const CleanWebpackPlugin = require("clean-webpack-plugin");
const cleanPlugin = new CleanWebpackPlugin(["dist"]);

module.exports = {
  entry: {
    main: ["./src/index.js"]
  },
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]__[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf}otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  devtool: "inline-source-map",
  plugins: [cleanPlugin, htmlPlugin]
};
