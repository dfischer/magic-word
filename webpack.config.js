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

let bot = {
  entry: "./src/bot/index.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "bot.js",
  },
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
