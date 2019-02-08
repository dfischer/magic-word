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

import open from "./image/open.js";
import makeParser from "./image/makeParser.js";
import connect from "./irc/connect.js";
import { createInterface as readline } from "readline";

let image = open();
let parse = makeParser(image);
/**
let irc = connect(image, {
  address: process.env.DENSHI_IRC_ADDRESS,
  port: process.env.DENSHI_IRC_PORT,
  nickname: process.env.DENSHI_IRC_NICKNAME,
  password: process.env.DENSHI_IRC_PASSWORD,
  channel: process.env.DENSHI_IRC_CHANNEL,
});
**/
let ui = readline({ input: process.stdin, output: process.stdout });
ui.setPrompt("user@denshi\n> ");
ui.on("line", async (line) => {
  let command = parse(line);
  let response = await command();
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
