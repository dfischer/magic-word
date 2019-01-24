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

import open from "./open.js";
import makeParser from "./makeParser.js";
import { createInterface as readline } from "readline";

let shell = open();
let parse = makeParser(shell);

let ui = readline({ input: process.stdin, output: process.stdout });
ui.setPrompt("user@denshi\n> ");
ui.on("line", (line) => {
  let command = parse(line);
  let response = command();
  console.log(response);
  ui.prompt();
});
ui.on("error", (error) => {
  console.log(`shell: error: ${error}`);
});
ui.on("close", () => {
  process.exit(1);
});
ui.prompt();
