var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./client/client.js",
  output: {
    path: path.resolve(__dirname, "static/js"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: "babel-loader",
        exclude: "/node-modules/",
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
