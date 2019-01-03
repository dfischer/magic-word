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

// Denshi has a concatenative bytecode with four primitive
// combinators:
//
//     [foo] [bar] a = bar [foo]
//     [foo] [bar] b = [[foo] bar]
//     [foo] [bar] c = [foo] [bar] [bar]
//     [foo] [bar] d = [foo]
//
// This is a universal basis; all data in Denshi is made of blocks
// like this, including numbers, strings, records, images, videos and
// so on.

// Rewrite a string of bytecode until it reaches normal form. Doesn't
// handle quotas, uses a simplistic evaluation strategy.
export default function normalize(src) {
  let fst = parse(src);
  let snd = solve(fst);
  return quote(snd);
}

class Term {
  constructor() {}
}

// The identity function.
class Id extends Term {
  constructor() { super() }
}

// [A] [B] a = B [A]
// "Application" of a block to the stack.
class App extends Term {
  constructor() { super() }
}

// [A] [B] b = [[A] B]
// "Binding" a block to another.
class Bind extends Term {
  constructor()  { super() }
}

// [A] c = [A] [A]
// Copying a block.
class Copy extends Term {
  constructor()  { super() }
}

// [A] d =
// Dropping a block.
class Drop extends Term {
  constructor()  { super() }
}

// A word like `foo`.
class Variable extends Term {
  constructor(name) {
    super();
    this.name = name;
  }
}

// A quotation like `[foo]`.
class Block extends Term {
  constructor(body) {
    super();
    this.body = body;
  }
}

// A sequence like `foo bar`.
class Sequence extends Term {
  constructor(fst, snd) {
    super();
    this.fst = fst;
    this.snd = snd;
  }
}

const id       = new Id();
const app      = new App();
const bind     = new Bind();
const copy     = new Copy();
const drop     = new Drop();
const block    = (x) => new Block(x);
const variable = (x) => new Variable(x);

function sequence(fst, snd) {
  // don't create junk code
  if (snd instanceof Id) {
    return fst;
  }
  if (fst instanceof Id) {
    return snd;
  }
  // normalize the sequence so that
  // `a b c d` becomes seq(a, seq(b, seq(c, d)))
  if (fst instanceof Sequence) {
    let inner = sequence(fst.snd, snd);
    return sequence(fst.fst, inner);
  }
  return new Sequence(fst, snd);
}

function log(x) {
  console.log(x);
}

function error(x) {
  debugger;
  throw x;
}

// Convert a string of code in to a term.
function parse(src) {
  const isLbracket = (x) => x == "[";
  const isRbracket = (x) => x == "]";
  const isLparen   = (x) => x == "(";
  const isRparen   = (x) => x == ")";
  // Words are alphanumeric with hyphens, always starting with an alpha.
  const isVariable = (x) => /^[a-z][a-z0-9-]+$/.test(x);
  const isHint     = (x) => /^\([a-z][a-z0-9-]*\)$/.test(x);
  const tokenize = (x) => {
    // Code is made out of words, separated by spaces. Allow word-like
    // separation on the inside of brackets, but not the outside. So
    // `[foo]` is legal but `[]bar` is not.
    return x.replace(/\[/g, "[ ").replace(/\]/g, " ]").split(" ");
  };
  let build = [];
  let stack = [];
  let words = tokenize(src);
  let index = 0;
  while (index < words.length) {
    const word = words[index];
    if (isLbracket(word)) {
      stack.push(build);
      build = [];
      index++;
    } else if (isRbracket(word)) {
      assert(stack.length != 0, "unbalanced brackets");
      var term = block(
        build.reduceRight((acc, x) => sequence(x, acc), id));
      build = stack.pop();
      build.push(term);
      index++;
    } else if (word === "a") {
      build.push(app);
      index++;
    } else if (word === "b") {
      build.push(bind);
      index++;
    } else if (word === "c") {
      build.push(copy);
      index++;
    } else if (word === "d") {
      build.push(drop);
      index++;
    } else if (isVariable(word)) {
      var term = variable(word);
      build.push(term);
      index++;
    } else {
      error(`couldn't parse word ${word}`);
    }
  }
  return build.reduceRight((acc, x) => sequence(x, acc), id);
}

// Convert a term into source code that will reproduce it.
function quote(term) {
  if (term instanceof Id) {
    return "";
  } else if (term instanceof App) {
    return "a";
  } else if (term instanceof Bind) {
    return "b";
  } else if (term instanceof Copy) {
    return "c";
  } else if (term instanceof Drop) {
    return "d";
  } else if (term instanceof Block) {
    let body = quote(term.body);
    return `[${body}]`;
  } else if (term instanceof Sequence) {
    let fst = quote(term.fst);
    let snd = quote(term.snd);
    return `${fst} ${snd}`;
  } else if (term instanceof Variable) {
    return term.name;
  } else {
    error(`cannot quote term: ${term}`);
  }
}

// Attempt to rewrite a term until it reaches normal form.
// I'll need to come back here and think about e.g. spacetime quota,
// evaluation strategies etc. For now this is just the easiest thing
// I could implement.
function solve(term) {
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

  function thunk(term) {
    sink = sink.concat(data);
    sink.push(term);
    data = [];
  }

  while (code.length > 0) {
    let term = code.pop();
    if (term instanceof Id) {
      // The identity function is very easy to implement.
    } else if (term instanceof App) {
      // [foo] [bar] a = bar [foo]
      if (data.length < 2) {
        thunk(term);
        continue;
      }
      let fun = data.pop();
      let arg = data.pop();
      code.push(arg);
      code.push(fun.body);
    } else if (term instanceof Bind) {
      // [foo] [bar] b = [[foo] bar]
      if (data.length < 2) {
        thunk(term);
        continue;
      }
      let fun = data.pop();
      let arg = data.pop();
      data.push(block(sequence(arg, fun.body)));
    } else if (term instanceof Copy) {
      // [foo] c = [foo] [foo]
      if (data.length < 1) {
        thunk(term);
        continue;
      }
      data.push(data[data.length-1]);
    } else if (term instanceof Drop) {
      // [foo] d =
      if (data.length < 1) {
        thunk(term);
        continue;
      }
      data.pop();
    } else if (term instanceof Block) {
      // Just put the block on the stack.
      data.push(term);
    } else if (term instanceof Sequence) {
      // Queue up the components in order.
      code.push(term.snd);
      code.push(term.fst);
    } else if (term instanceof Variable) {
      thunk(term);
    } else {
      error(`invalid term: ${term}`);
    }
  }

  // All of the code in `sink`, `data`, and `code` is going to be
  // sequenced together in to one term.  `code` is a *queue*, so we
  // want the rightmost element to be at the front of the function it
  // represents. For `sink` and `data`, the leftmost element should be
  // in front.

  let state = id;
  //           left-to-right      rightmost in front
  state = code.reduce((acc, x) => sequence(x, acc), state);
  //           right-to-left           leftmost in front
  state = data.reduceRight((acc, x) => sequence(x, acc), state);
  //           right-to-left           leftmost in front
  state = sink.reduceRight((acc, x) => sequence(x, acc), state);
  return state;
}

function assert(x, message) {
  if (!x) {
    console.log(`assert: ${message}`);
    debugger;
    throw "aborting";
  }
}

(function() {
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
    log(`test: ${key} = ${expected}`);
    const actual = normalize(key);
    if (expected !== actual) {
      error(`expected: ${key} = ${expected}\nactual: ${key} = ${actual}`);
    }
  }
})();
