const path = require("path");

let app = {
  input: "./src/app/index.js",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "app.js",
  },
};

let bot = {
  input: "./src/bot/index.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "bot.js",
  },
};

module.exports = [app, bot];
