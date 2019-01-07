const path = require("path");

let app = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "app.js",
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

let bot = {
  target: "node",
  entry: "./src/bot.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "bot.js",
  },
  externals: externals,
};

let shell = {
  target: "node",
  entry: "./src/shell.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "shell.js",
  },
  mode: "development",
  externals: externals,
};

module.exports = [app, bot, shell];
