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
    } else if (token === "a") {
      build.push(Term.apply);
    } else if (token === "b") {
      build.push(Term.bind);
    } else if (token === "c") {
      build.push(Term.copy);
    } else if (token === "d") {
      build.push(Term.drop);
    } else if (token === "r") {
      build.push(Term.reset);
    } else if (token === "s") {
      build.push(Term.shift);
    } else if (token === "+") {
      build.push(Term.sum);
    } else if (token === "-") {
      build.push(Term.negate);
    } else if (token === "*") {
      build.push(Term.product);
    } else if (token === "/") {
      build.push(Term.invert);
    } else if (token === "^") {
      build.push(Term.exp);
    } else if (token === "$") {
      build.push(Term.log);
    } else if (token === "@") {
      build.push(Term.cos);
    } else if (token === "%") {
      build.push(Term.sin);
    } else if (token === "&") {
      build.push(Term.min);
    } else if (token === "|") {
      build.push(Term.max);
    } else if (token === "!") {
      build.push(Term.floor);
    } else if (token === "?") {
      build.push(Term.ceil);
    } else if (/^\(.+\)$/.test(token)) {
      let name = token.substring(1, token.length - 1);
      let term = Term.hint(name);
      build.push(term);
    } else if (/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(token)) {
      let value = Number.parseFloat(token);
      assert(!Number.isNaN(value));
      let term = Term.real(value);
      build.push(term);
    } else {
      //assert(token.length > 1, "Words must be at least 2 characters.");
      assert(!token.includes("("), "Words cannot include parentheses.");
      assert(!token.includes(")"), "Words cannot include parentheses.");
      let term = Term.word(token);
      build.push(term);
    }
  }
  return build.reduceRight((acc, x) => {
    return Term.sequence(x, acc);
  }, Term.id);
}
