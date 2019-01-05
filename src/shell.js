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

import { createInterface as readline } from "readline";
import normalize from "./abcd/normalize.js";

function shell(prompt, callback) {
  let ui = readline({ input: process.stdin, output: process.stdout });
  ui.prompt(prompt);
  ui.on("line", (line) => {
    callback(line);
    ui.prompt(prompt);
  });
  return ui;
}

shell("user@denshi\n> ", (src) => {
  console.log(normalize(src));
});
