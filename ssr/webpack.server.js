const path = require("path");
const merge = require("webpack-merge");
const webpackNodeExternals = require("webpack-node-externals");
const baseConfig = require("./webpack.base.js");
const config = {
  //bundle for node, not browser
  target: "node",
  //specify server app entry
  entry: "./src/index.js",
  //specify where output is sent
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  externals: [webpackNodeExternals()],
};
module.exports = merge(baseConfig, config);

//webpack doesn't automatically restart when changes are save to config files
