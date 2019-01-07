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

import normalize from "./normalize.js";

export default class Module {
  constructor() {
    this.data = new Map();
  }

  set(key, value) {
    key = key.trim();
    value = value.trim();
    if (key === value) {
      this.data.delete(key);
      return key;
    } else {
      this.data.set(key, value);
      return value;
    }
  }

  get(key) {
    if (this.data.has(key)) {
      return this.data.get(key);
    }
    return key;
  }

  delete(key) {
    this.data.delete(key);
    return key;
  }

  normalize(src) {
    return normalize(src, {
      module: (key) => this.get(key),
    });
  }

  include(prefix, reference) {
    // XXX TODO Module#include
  }
}
