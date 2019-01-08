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

function loop(prompt, onInput) {
  let ui = readline({ input: process.stdin, output: process.stdout });
  ui.prompt(prompt);
  ui.on("line", (input) => {
    let output = onInput(input);
    console.log(output);
    ui.prompt(prompt);
  });
  return ui;
}

import assert from "assert";
import Shell from "./abcd/Shell.js";

(function() {
  let shell = new Shell();
  assert.deepEqual(shell.send("foo"), "foo");
  shell.send(":foo bar [baz] qux");
  assert.deepEqual(shell.send("foo"), "bar [baz] qux");
  shell.send("~foo");
  assert.deepEqual(shell.send("foo"), "foo");
})();

let shell = new Shell();
loop("user@denshi\n> ", x => shell.send(x));
