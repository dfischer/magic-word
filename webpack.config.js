const path = require("path");

let v0_client = {
  mode: "development",
  target: "web",
  entry: "./src/v0/client/index.js",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "denshi.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};

const fs = require("fs");

let externals = {};
fs.readdirSync("node_modules")
  .filter(x => [".bin"].indexOf(x) === -1)
  .forEach(x => externals[x] = `commonjs ${x}`);

let v0_server = {
  mode: "development",
  target: "node",
  entry: "./src/v0/server/index.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "denshi.js",
  },
  externals: externals,
};

let v1_lib = {
  mode: "development",
  target: "node",
  entry: "./src/v1/denshi.js",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "denshi.js",
    library: "denshi",
    libraryTarget: "commonjs2",
    libraryExport: "default",
  },
  // this doesn't seem to work...something about the chromebook setup.
  // devtool: "source-map",
  externals: externals,
}

module.exports = [v1_lib];
