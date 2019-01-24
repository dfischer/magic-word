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

export default () => {
  let module = new Map();
  const set = (key, value) => {
    console.log(`module: set ${key} to ${value}`);
    value = norm(value);
    module.set(key, value);
    return value;
  }
  const unset = (key) => {
    console.log(`module: unset ${key}`);
    module.delete(key);
    return key;
  }
  const localNorm = (src) => {
    console.log(`module: norm ${src}`);
    return norm(src, (name) => {
      if (module.has(name)) {
        return module.get(name);
      }
      return name;
    });
  }
  return [set, unset, localNorm];
}
