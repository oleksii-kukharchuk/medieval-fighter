const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",

  entry: "./src/index.ts",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath:
      process.env.NODE_ENV === "production" ? "/medieval-fighter/" : "/",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "public/assets", to: "assets" },
        { from: "public/favicon.png", to: "" },
      ],
    }),
  ],
};
