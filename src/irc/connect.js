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

import { Socket } from "net";
import { setTimeout } from "timers";
import parseIRC from "./parse.js";
import norm from "../abc/norm/pure/norm.js";
import openShell from "../abc/shell/open.js";
import makeABCParser from "../abc/shell/makeParser.js";

function eachLine(thunk) {
  let buf = "";
  return (data) => {
    buf += data;
    let offset = 0;
    let index = buf.indexOf("\n", offset);
    while (index >= 0) {
      let line = buf.substring(offset, index);
      thunk(line);
      offset = index + 1;
      index = buf.indexOf("\n", offset);
    }
    buf = buf.substring(offset);
  }
}

export default ({
  address,
  port,
  nickname,
  password,
  channel,
}) => {
  let shell = openShell();
  let parseABC = makeABCParser(shell);
  let socket = new Socket();
  console.log(`irc: connecting to ${address}:${port}...`);
  socket.connect(port, address, () => {
    console.log(`irc: connected`);
    socket.write(`NICK ${nickname}\n`);
    socket.write(`USER ${nickname} 0 * :${nickname}\n`);
    socket.write(`PASS ${password}\n`);
    socket.write(`JOIN ${channel}\n`);
  });
  socket.on("data", eachLine((line) => {
    console.log(`irc: ${line}`);
    let message = parseIRC(line);
    if (message.verb === "PING") {
      const body = message.parameters[0];
      socket.write(`PONG ${body}\n`);
      console.log(`irc: PONG ${body}`);
    } else if (message.verb === "PRIVMSG") {
      const target = message.parameters[0];
      const body = message.parameters[1];
      const flag = `${nickname}: `;
      if (target === channel) {
        if (body.startsWith(flag)) {
          console.log(`irc: flag tripped by "${body}", normalizing`);
          let src = body.replace(flag, "");
          let command = parseABC(src);
          let response = command();
          socket.write(`PRIVMSG ${channel} :${response}\n`);
        }
      } else if (target === nickname) {
        let name = message.source.split("!")[0];
        console.log(`irc: PM from ${name}, normalizing`);
        let command = parseABC(body);
        let response = command();
        socket.write(`PRIVMSG ${name} :${response}\n`);
      }
    }
  }));
  socket.on("error", (error) => {
    console.log(`irc: error: ${error}`);
  });
  socket.on("close", () => {
    console.log(`irc: close`);
  });
  return () => {
    socket.destroy();
  }
}
