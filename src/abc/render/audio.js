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

import norm from "../norm/pure/norm.js";

export default (wave) => {
  let buf = new Float64Array(65536);
  for (let i = 0; i < buf.length; i++) {
    let time = i / buf.length;
    let src = `${time} ${wave}`;
    let dst = norm(src);
    let sample = Number.parseFloat(dst);
    assert(!Number.isNaN(value));
    buf[i] = sample;
  }
  return buf;
}
