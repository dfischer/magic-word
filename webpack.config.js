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

module.exports = [v0_client, v0_server];
