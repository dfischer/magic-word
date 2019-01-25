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

import Message from "./Message.js";

// XXX TODO Break this up and document it.
const pattern = /^(?:@([^\r\n ]*) +)?(?::([^\r\n ]+) +)?([^\r\n ]+)(?: +([^:\r\n ]+[^\r\n ]*(?: +[^:\r\n ]+[^\r\n ]*)*)|)?(?: +:([^\r\n]*)| +)?[\r\n]*$/;

export default (line) => {
  let matches = line.match(pattern);
  if (matches === null) {
    throw `irc: Couldn't parse line: ${line}`;
  } else {
    const tags = matches[1];
    const source = matches[2];
    const verb = matches[3];
    const fixedParameters = matches[4];
    const trailingParameters = matches[5];
    let parameters = [];
    if (fixedParameters !== undefined) {
      parameters = fixedParameters.split(" ");
    }
    if (trailingParameters !== undefined) {
      parameters.push(trailingParameters);
    }
    return new Message(source, verb, parameters, line);
  }
}
