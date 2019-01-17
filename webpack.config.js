const path = require("path");

let client = {
  mode: "development",
  target: "web",
  entry: "./src/client/index.js",
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

let server = {
  mode: "development",
  target: "node",
  entry: "./src/server/index.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "denshi.js",
  },
  externals: externals,
};

module.exports = [client, server];
