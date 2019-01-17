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

import assert from "../assert.js";

export default class Term {
  constructor() {}

  static get id()   { return kId   }
  static get app()  { return kApp  }
  static get bind() { return kBind }
  static get copy() { return kCopy }
  static get drop() { return kDrop }

  // A hint, like `(value)`.
  static hint(value) { return new Hint(value) }

  // A word, like `value`.
  static word(value) { return new Word(value) }

  // A block, like `[body]`.
  static block(body) { return new Block(body) }

  // A sequence, like `fst snd`.
  static seq(fst, snd) {
    // Don't create junk code.
    if (Term.isId(snd)) {
      return fst;
    }
    if (Term.isId(fst)) {
      return snd;
    }
    // Normalize to the form
    // (a (b (c ...)))
    if (Term.isSeq(fst)) {
      const inner = Term.seq(fst.snd, snd);
      return Term.seq(fst.fst, inner);
    }
    // Otherwise it's just a regular seq.
    return new Seq(fst, snd);
  }

  static isTerm(object)  { return object instanceof Term  }
  static isId(object)    { return object instanceof Id    }
  static isApp(object)   { return object instanceof App   }
  static isBind(object)  { return object instanceof Bind  }
  static isCopy(object)  { return object instanceof Copy  }
  static isDrop(object)  { return object instanceof Drop  }
  static isHint(object)  { return object instanceof Hint  }
  static isWord(object)  { return object instanceof Word  }
  static isBlock(object) { return object instanceof Block }
  static isSeq(object)   { return object instanceof Seq   }

  static parse(src) {
    const isLbracket = (x) => x == "[";
    const isRbracket = (x) => x == "]";
    const isLparen   = (x) => x == "(";
    const isRparen   = (x) => x == ")";
    // Words are alphanumeric with hyphens, always starting with an alpha.
    const isWord     = (x) => /^[^\[\]\(\)\t\r\n :]+$/.test(x);
    const isHint     = (x) => /^\(([^\[\]\(\)\t\r\n :]+)\)$/.test(x);
    const tokenize = (x) => {
      // Code is made out of words, separated by spaces. Allow word-like
      // separation on the inside of brackets, but not the outside. So
      // `[foo]` is legal but `[]bar` is not.
      return x.replace(/\[/g, "[ ").replace(/\]/g, " ]").split(" ");
    };
    let build = [];
    let stack = [];
    let index = 0;
    let tokens = tokenize(src);
    while (index < tokens.length) {
      const token = tokens[index];
      if (isLbracket(token)) {
        stack.push(build);
        build = [];
        index++;
      } else if (isRbracket(token)) {
        assert(stack.length != 0, "unbalanced brackets");
        var term = Term.block(
          build.reduceRight((acc, x) => Term.seq(x, acc), Term.id));
        build = stack.pop();
        build.push(term);
        index++;
      } else if (token === "a") {
        build.push(Term.app);
        index++;
      } else if (token === "b") {
        build.push(Term.bind);
        index++;
      } else if (token === "c") {
        build.push(Term.copy);
        index++;
      } else if (token === "d") {
        build.push(Term.drop);
        index++;
      } else if (isWord(token)) {
        var term = Term.word(token);
        build.push(term);
        index++;
      } else {
        assert(token.length === 0, `unknown token: ${token}`);
        index++;
      }
    }
    return build.reduceRight((acc, x) => Term.seq(x, acc), Term.id);
  }
}

// The identity function.
class Id extends Term {
  constructor() { super() }
  fold({ id })  { return id(this) }
  toString()    { return "" }
}

// [A] [B] a = B [A]
// "Application" of a block to the stack.
class App extends Term {
  constructor() { super() }
  fold({ app }) { return app(this) }
  toString()    { return "a"       }
}

// [A] [B] b = [[A] B]
// "Binding" a block to another.
class Bind extends Term {
  constructor()  { super() }
  fold({ bind }) { return bind(this) }
  toString()     { return "b"        }
}

// [A] c = [A] [A]
// Copying a block.
class Copy extends Term {
  constructor()  { super() }
  fold({ copy }) { return copy(this) }
  toString()     { return "c"        }
}

// [A] d =
// Dropping a block.
class Drop extends Term {
  constructor()  { super() }
  fold({ drop }) { return drop(this) }
  toString()     { return "d"        }
}

// A hint like `(foo)`.
class Hint extends Term {
  constructor(value) {
    super();
    this.value = value;
  }
  fold({ hint }) { return hint(this)        }
  toString()     { return `(${this.value})` }
}

// A word like `foo`.
class Word extends Term {
  constructor(value) {
    super();
    this.value = value;
  }
  fold({ word }) { return word(this) }
  toString()     { return this.value }
}

// A quotation like `[foo]`.
class Block extends Term {
  constructor(body) {
    super();
    this.body = body;
  }
  fold({ block }) { return block(this)      }
  toString()      { return `[${this.body}]` }
}

// A sequence like `foo bar`.
class Seq extends Term {
  constructor(fst, snd) {
    super();
    this.fst = fst;
    this.snd = snd;
  }
  fold({ seq }) { return seq(this)                 }
  toString()    { return `${this.fst} ${this.snd}` }
}

const kId   = new Id();
const kApp  = new App();
const kBind = new Bind();
const kCopy = new Copy();
const kDrop = new Drop();
