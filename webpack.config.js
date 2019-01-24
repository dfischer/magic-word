const path = require("path");
const fs = require("fs");

let externals = {};
fs.readdirSync("node_modules")
  .filter(x => [".bin"].indexOf(x) === -1)
  .forEach(x => externals[x] = `commonjs ${x}`);

let denshi = {
  mode: "development",
  target: "node",
  entry: "./src/denshi.js",
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

module.exports = [denshi];
