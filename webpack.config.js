const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./src/index.ts",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: isProd ? "/medieval-fighter/" : "/",
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

    devServer: {
      port: 3000,
      open: true,
      hot: true,
      static: {
        directory: path.join(__dirname, "public"),
      },
      historyApiFallback: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),

      new CopyWebpackPlugin({
        patterns: [
          { from: "public/assets", to: "assets" },
          { from: "public/style.css", to: "" },
          { from: "public/favicon.png", to: "" },
        ],
      }),
    ],
  };
};
