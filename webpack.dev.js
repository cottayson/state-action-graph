const webpackCommon = require('./webpack.common');
const path = require('path');

// all options for devtool:
// https://webpack.js.org/configuration/devtool/

module.exports = {
  ...webpackCommon,
  devtool: "inline-source-map",
  // devtool: "cheap-source-map",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    before: function () { },
    after: function () { },
  }
};