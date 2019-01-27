// This file is a part of Denshi.
// Copyright (C) 2019 Matthew Blount

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public
// License along with this program.  If not, see
// <https://www.gnu.org/licenses/.

const path = require("path");
const fs = require("fs");

let externals = {};
fs.readdirSync("node_modules")
  .filter(x => [".bin"].indexOf(x) === -1)
  .forEach(x => externals[x] = `commonjs ${x}`);

let app = {
  mode: "development",
  target: "web",
  entry: "./src/app/main.js",
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
}

let irc = {
  mode: "development",
  target: "node",
  entry: "./src/irc/main.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "irc.js",
  },
  externals: externals,
}

let shell = {
  mode: "development",
  target: "node",
  entry: "./src/abc/shell/main.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "shell.js",
  },
  externals: externals,
}

let wiki = {
  mode: "development",
  target: "node",
  entry: "./src/wiki/main.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "wiki.js",
  },
  externals: externals,
}

module.exports = [app, irc, shell, wiki];
