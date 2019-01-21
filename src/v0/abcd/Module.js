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

// The current strategy for accelerating polynomial types ("ADT"s) is
// to recognize the implementations of `unit`, `inl`, `inr` and `pair`.

// Predicates the unit block: []
function isUnit(block) {
  return block === "[]";
}

// Predicates blocks that implemement `inl`.
// [L] [R] [X] inl exec = [X] L
function isInl(block) {
  let residual = normalize(`[fst] [snd] [value] ${block} [[]] a a d`);
  return residual === "[value] fst";
}

// Predicates blocks that implement `inr`.
// [L] [R] [X] inr exec = [X] R
function isInr(block) {
  let residual = normalize(`[fst] [snd] [value] ${block} [[]] a a d`);
  return residual === "[value] snd";
}

// Predicates blocks that implement `pair`.
// [A] [B] pair = [[A] [B]]
function isPair(block) {
  let residual = normalize(`[fst] [snd] ${block}`);
  return residual === "[[fst] [snd]]";
}

// A module is a key-value store, associating names with blocks of
// code.
export default class Module {
  constructor() {
    this._data = new Map();
  }

  // Iterate over the key/value pairs in the module.
  [Symbol.iterator]() {
    return this._data[Symbol.iterator]();
  }

  // Define a word with a block of code.
  define(key, value) {
    // XXX TODO Prevent cycles in definitions. Currently a cycle will
    // just blow everything up.
    key = key.trim();
    value = value.trim();
    if (key === value) {
      this._data.delete(key);
      return key;
    } else {
      // "Acceleration" doesn't actually do anything yet; I just want
      // to demonstrate that it's feasible to recognize sum/product
      // types.
      if (isUnit(value)) {
        console.log("Accelerating `unit`...");
      } else if (isInl(value)) {
        console.log("Accelerating `inl`...");
      } else if (isInr(value)) {
        console.log("Accelerating `inr`...");
      } else if (isPair(value)) {
        console.log("Accelerating `pair`...");
      }
      this._data.set(key, value);
      return value;
    }
  }

  // Undefine a word.
  delete(key) {
    this._data.delete(key);
    return key;
  }

  get(key) {
    if (this._data.has(key)) {
      return this._data.get(key);
    }
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
      expand: (x) => this.get(x),
    });
  }

  search(query) {

  }

  import(prefix, ref) {

  }
}
