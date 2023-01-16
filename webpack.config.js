const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  { //css兼容性处理
    "loader": "postcss-loader",
    "options": {
      "postcssOptions": {
        "plugins": [
          [
            "postcss-preset-env", {
              "browsers": "last 2 versions"
            }
          ]
        ]
      }
    }
  }
];


const config = {
  entry: { 
    "main1": path.resolve(__dirname, "./src/index.ts"),
    // "main2": resolve(__dirname, "src/entry2.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    "filename": "js/[name].[contenthash:10].min.js",
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      "filename": "css/built.[contenthash:10].min.css"
    }),
    new CleanWebpackPlugin(),
    new EslintWebpackPlugin({
      "extensions": "js",
      "exclude": "/node_modules/",
      "fix": true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/i,
        use: [...commonCssLoader, "less-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
