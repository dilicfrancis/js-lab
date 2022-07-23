const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const config = {
  //specify client app entry
  entry: "./src/client/index.js",
  //specify where output is sent
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
};

module.exports = merge(baseConfig, config);
