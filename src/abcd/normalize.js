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

// ABCD is a concatenative bytecode with four primitive functions:
//
//     [foo] [bar] a = bar [foo]
//     [foo] [bar] b = [[foo] bar]
//     [foo] [bar] c = [foo] [bar] [bar]
//     [foo] [bar] d = [foo]
//
// This is a universal basis; all data in Denshi is made of blocks
// like this, including numbers, strings, records, images, videos and
// so on.

import Term from "./Term.js";
import assert from "../assert.js";

// Rewrite a string of bytecode until it reaches normal form. Doesn't
// handle quotas, uses a simplistic evaluation strategy. Note that
// this will hang if the bytecode is some sort of infinite loop.
// `ctx` is of type: {
//   expand: a function from words to their expansions
// }
export default function normalize(src, ctx) {
  ctx = ctx || {};
  ctx.expand = ctx.expand || ((x) => x);
  var term = Term.parse(src);
  var term = _normalize(term, ctx);
  return term.toString();
}

// Attempt to rewrite a term until it reaches normal form.
// I'll need to come back here and think about e.g. spacetime quota,
// evaluation strategies etc. For now this is just the easiest thing
// I could implement.
function _normalize(term, ctx) {
  // Terms that were "thunked" because of a failure to perform a
  // rewrite. If a rewrite can't be performed, that term and all
  // of the terms on the stack become "dead code".
  let sink = [];
  // The terms placed on the stack. Note that they will all be
  // instances of `Block`, as the only data in Denshi are blocks,
  // introduced by block literals `[foo]`.
  let data = [];
  // A *queue* of terms to rewrite. Note that this array is modeling a
  // queue, so the "first" element is at the end of the array.
  let code = [term];

  let dictionary = new Map();

  function thunk(term) {
    sink = sink.concat(data);
    sink.push(term);
    data = [];
  }

  while (code.length > 0) {
    let term = code.pop();
    assert(Term.isTerm(term), `invalid term: ${term}`);
    if (Term.isId(term)) {
      // [foo] = [foo]
    } else if (Term.isApp(term)) {
      // [foo] [bar] a = bar [foo]
      if (data.length < 2) {
        thunk(term);
        continue;
      }
      let fun = data.pop();
      let arg = data.pop();
      code.push(arg);
      code.push(fun.body);
    } else if (Term.isBind(term)) {
      // [foo] [bar] b = [[foo] bar]
      if (data.length < 2) {
        thunk(term);
        continue;
      }
      let fun = data.pop();
      let arg = data.pop();
      let seq = Term.seq(arg, fun.body);
      let blk = Term.block(seq);
      data.push(blk);
    } else if (Term.isCopy(term)) {
      // [foo] c = [foo] [foo]
      if (data.length < 1) {
        thunk(term);
        continue;
      }
      data.push(data[data.length-1]);
    } else if (Term.isDrop(term)) {
      // [foo] d =
      if (data.length < 1) {
        thunk(term);
        continue;
      }
      data.pop();
    } else if (Term.isBlock(term)) {
      // Just put the block on the stack.
      data.push(term);
    } else if (Term.isSeq(term)) {
      // Queue up the components in order.
      code.push(term.snd);
      code.push(term.fst);
    } else if (Term.isWord(term)) {
      // If we've parsed this word before, queue its definition.
      if (dictionary.has(term.value)) {
        let binding = dictionary.get(term.value);
        code.push(binding);
        continue;
      }
      let source = ctx.expand(term.value);
      if (source === term.value) {
        // If the word's expansion is equal to its name, that means it
        // didn't actually have a definition. So just thunk it.
        thunk(term);
      } else {
        // Otherwise cache the definition we got and queue it.
        let binding = Term.parse(source);
        code.push(binding);
        dictionary.set(term.value, binding);
      }
    } else if (Term.isHint(term)) {
      // Preserve hints in the code for now.
      thunk(term);
    }
  }

  // All of the code in `sink`, `data`, and `code` is going to be
  // sequenced together in to one term.  `code` is a *queue*, so we
  // want the rightmost element to be at the front of the function it
  // represents. For `sink` and `data`, the leftmost element should be
  // in front.

  let state = Term.id;
  //           left-to-right      rightmost in front
  state = code.reduce((acc, x) => Term.seq(x, acc), state);
  //           right-to-left           leftmost in front
  state = data.reduceRight((acc, x) => Term.seq(x, acc), state);
  //           right-to-left           leftmost in front
  state = sink.reduceRight((acc, x) => Term.seq(x, acc), state);
  return state;
}

(function() {
  // Just a quick sanity check. I'll need to think about a more
  // sophisticated testing setup.
  let tests = {
    "[foo] [bar] a": "bar [foo]",
    "[foo] [bar] b": "[[foo] bar]",
    "[foo] c": "[foo] [foo]",
    "[foo] d": "",
    "[foo] a": "[foo] a",
    "[foo] b": "[foo] b",
    "c": "c",
    "d": "d",
    "[foo] [bar] c": "[foo] [bar] [bar]",
    "[foo] [bar] d": "[foo]",
  };
  for (let [key, expected] of Object.entries(tests)) {
    console.log(`test: ${key} = ${expected}`);
    const actual = normalize(key);
    assert(expected === actual,
           `expected: ${key} = ${expected}\nactual: ${key} = ${actual}`);
  }
})();
