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

import fs from "fs";
import net from "net";
import assert from "assert";
import Shell from "../abcd/Shell.js";

(function() {
  console.log(`testing shell...`);
  let shell = new Shell();
  assert.deepEqual(shell.send("foo"), "foo");
  shell.send(":foo bar [baz] qux");
  assert.deepEqual(shell.send("foo"), "bar [baz] qux");
  shell.send("~foo");
  assert.deepEqual(shell.send("foo"), "foo");
})();

const home = process.env.DENSHI_HOME;
if (home === undefined) {
  throw "DENSHI_HOME is undefined";
}
let modulePath = `${home}/modules/default`;
let moduleBody = fs.readFileSync(modulePath, "utf8");
let shell = new Shell();
shell.send(moduleBody);

const serve = (shell, socket) => {
  const prompt = "user@denshi\n> ";
  let buf = "";
  socket.setEncoding("utf8");
  socket.on("data", (data) => {
    buf += data;
    let offset = 0;
    let index = buf.indexOf("\n", offset);
    while (index !== -1) {
      let input = buf.substring(offset, index - offset);
      let output = shell.send(input);
      socket.write(`${output}\n${prompt}`);
      offset = index + 1;
      index = buf.indexOf("\n", offset);
    }
    buf = buf.substring(offset);
  });
  socket.on("close", () => {
    fs.writeFileSync(modulePath, shell.toString());
    console.log(`goodbye`);
    process.exit(1);
  });
  socket.on("error", (error) => {
    console.log(`ERROR: ${error}`);
    process.exit(1);
  });
  socket.write(prompt);
}

let server = net.createServer((socket) => serve(shell, socket));
server.listen(4000);