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

function shell(prompt, onInput) {
  let ui = readline({ input: process.stdin, output: process.stdout });
  ui.prompt(prompt);
  ui.on("line", (input) => {
    let output = onInput(input);
    console.log(output);
    ui.prompt(prompt);
  });
  return ui;
}

import Module from "./abcd/Module.js";

// XXX TODO Maybe this could be a coroutine, so module could be kept
// inside that callback's scope and remain stateful between turns.

let module = new Module();

shell("user@denshi\n> ", (src) => {
  if (src === ".dump") {
    return module.toString();
  }
  let match = src.match(/^:([a-z][a-z0-9]*) +(.*)$/);
  if (match !== null) {
    return module.set(match[1], match[2]);
  } else {
    return module.normalize(src);
  }
});
