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
import * as xl from "./accelerate.js";

// A module is a key-value store, associating names with blocks of
// code.
export default class Module {
  constructor() {
    this.data = new Map();
  }

  // Define a word with a block of code.
  set(key, value) {
    // XXX TODO Prevent cycles in definitions. Currently a cycle will
    // just blow everything up.
    key = key.trim();
    value = value.trim();
    if (key === value) {
      this.data.delete(key);
      return key;
    } else {
      // "Acceleration" doesn't actually do anything yet; I just want
      // to demonstrate that it's feasible to recognize sum/product
      // types.
      if (xl.isUnit(value)) {
        console.log("Accelerating `unit`...");
      } else if (xl.isInl(value)) {
        console.log("Accelerating `inl`...");
      } else if (xl.isInr(value)) {
        console.log("Accelerating `inr`...");
      } else if (xl.isPair(value)) {
        console.log("Accelerating `pair`...");
      }
      this.data.set(key, value);
      return value;
    }
  }

  // Get the block of code associated with a word. If there's no
  // definition, then the word is considered to be associated with
  // itself.
  get(key) {
    if (this.data.has(key)) {
      return this.data.get(key);
    }
    return key;
  }

  // Undefine a word.
  delete(key) {
    this.data.delete(key);
    return key;
  }

  // Normalize a block of code, expanding words to their definitions.
  // I do want to associate some sort of effort quota with
  // normalization in general, and in particular with the expansion of
  // words. Awelon also mentioned something about only expanding when
  // the expansion would actually make progress, but I'm not yet sure
  // how to determine that.
  normalize(src) {
    return normalize(src, {
      expand: (key) => this.get(key),
    });
  }

  include(prefix, reference) {
    // XXX TODO Module#include
  }
}
