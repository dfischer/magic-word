const path = require("path");

let app = {
  entry: "./src/app/index.js",
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
  entry: "./src/bot/index.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "bot.js",
  },
  externals: externals,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};

module.exports = [app, bot];
