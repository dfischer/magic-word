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

import connect from "./connect.js";
import open from "../image/open.js";
import makeParser from "../shell/makeParser.js";

const nickname = process.env.DENSHI_IRC_NICKNAME;
const password = process.env.DENSHI_IRC_PASSWORD;
const channel  = process.env.DENSHI_IRC_CHANNEL;
const address  = process.env.DENSHI_IRC_ADDRESS;
const port     = process.env.DENSHI_IRC_PORT;

let image = open();
let parse = makeParser(image);
let handle = connect(
  { nickname, password, channel, address, port },
  async (line) => {
    let command = parse(line);
    let response = await command();
    return response;
  },
);
