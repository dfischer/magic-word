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

import assert from "../../../assert.js";
import { Term } from "./Term.js";

const atomPattern = /^[abcdfgklnpqrstvxz]$/;
const wordPattern = /^[a-zA-Z0-9-_.~]+$/;
const hintPattern = /^\([a-zA-Z0-9-_.~]+\)$/;
const realPattern = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

// Map a string to a Term, according to the following bytecode map:
// a = apply
// b = bind
// c = copy
// d = drop
// f = floor
// g = ceil
// k = cos
// l = log
// n = -
// p = +
// q = >
// r = reset
// s = shift
// t = *
// v = /
// x = exp
// z = sin
export default (src) => {
  src = src.replace(/\[/g, "[ ");
  src = src.replace(/\]/g, " ]");
  let tokens = src.split(" ");
  let build = [];
  let stack = [];
  let index = 0;
  for (let token of tokens) {
    if (token === "[") {
      stack.push(build);
      build = [];
    } else if (token === "]") {
      assert(stack.length != 0, "Unbalanced brackets.");
      let fold = build.reduceRight((acc, x) => {
        return Term.sequence(x, acc);
      }, Term.id);
      let term = Term.block(fold);
      build = stack.pop();
      build.push(term);
    } else if (atomPattern.test(token)) {
      let term;
      switch (token) {
      case "a":
        term = Term.apply;
        break;
      case "b":
        term = Term.bind;
        break;
      case "c":
        term = Term.copy;
        break;
      case "d":
        term = Term.drop;
        break;
      case "f":
        term = Term.floor;
        break;
      case "g":
        term = Term.ceil;
        break;
      case "k":
        term = Term.cos;
        break;
      case "l":
        term = Term.log;
        break;
      case "n":
        term = Term.negate;
        break;
      case "p":
        term = Term.sum;
        break;
      case "q":
        term = Term.gt;
        break;
      case "r":
        term = Term.reset;
        break;
      case "s":
        term = Term.shift;
        break;
      case "t":
        term = Term.product;
        break;
      case "v":
        term = Term.invert;
        break;
      case "x":
        term = Term.exp;
        break;
      case "z":
        term = Term.sin;
        break;
      }
      build.push(term);
    } else if (hintPattern.test(token)) {
      let name = token.substring(1, token.length - 1);
      let term = Term.hint(name);
      build.push(term);
    } else if (realPattern.test(token)) {
      let value = Number.parseFloat(token);
      assert(!Number.isNaN(value));
      let term = Term.real(value);
      build.push(term);
    } else if (wordPattern.test(token)) {
      let term = Term.word(token);
      build.push(term);
    } else {

    }
  }
  return build.reduceRight((acc, x) => {
    return Term.sequence(x, acc);
  }, Term.id);
}
