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

export class Term {
  constructor() {

  }

  static get id()      { return kId      }
  static get apply()   { return kApply   }
  static get bind()    { return kBind    }
  static get copy()    { return kCopy    }
  static get drop()    { return kDrop    }
  static get reset()   { return kReset   }
  static get shift()   { return kShift   }
  static get sum()     { return kSum     }
  static get negate()  { return kNegate  }
  static get product() { return kProduct }
  static get invert()  { return kInvert  }
  static get exp()     { return kExp     }
  static get log()     { return kLog     }
  static get cos()     { return kCos     }
  static get sin()     { return kSin     }
  static get floor()   { return kFloor   }
  static get ceil()    { return kCeil    }
  
  static real(value) { return new Literal("real", value) }
  static hint(name)  { return new Literal("hint", name)  }
  static word(name)  { return new Literal("word", name)  }
  static block(body) { return new Unary("block", body)   }

  static sequence(fst, snd) {
    if (Term.isId(snd)) {
      return fst;
    }
    if (Term.isId(fst)) {
      return snd;
    }
    if (Term.isSequence(fst)) {
      let inner = Term.sequence(fst.snd, snd);
      return Term.sequence(fst.fst, inner);
    }
    return new Binary("sequence", fst, snd);
  }

  static isTerm(obj)     { return obj instanceof Term     }
  static isConstant(obj) { return obj instanceof Constant }
  static isLiteral(obj)  { return obj instanceof Literal  }
  static isUnary(obj)    { return obj instanceof Unary    }
  static isBinary(obj)   { return obj instanceof Binary   }

  static isId(obj) {
    return Term.isConstant(obj) && obj.name === "id";
  }

  static isApply(obj) {
    return Term.isConstant(obj) && obj.name === "apply";
  }

  static isBind(obj) {
    return Term.isConstant(obj) && obj.name === "bind";
  }

  static isCopy(obj) {
    return Term.isConstant(obj) && obj.name === "copy";
  }

  static isDrop(obj) {
    return Term.isConstant(obj) && obj.name === "drop";
  }

  static isReset(obj) {
    return Term.isConstant(obj) && obj.name === "reset";
  }

  static isShift(obj) {
    return Term.isConstant(obj) && obj.name === "shift";
  }

  static isSum(obj) {
    return Term.isConstant(obj) && obj.name === "sum";
  }

  static isNegate(obj) {
    return Term.isConstant(obj) && obj.name === "negate";
  }

  static isProduct(obj) {
    return Term.isConstant(obj) && obj.name === "product";
  }

  static isInvert(obj) {
    return Term.isConstant(obj) && obj.name === "invert";
  }

  static isExp(obj) {
    return Term.isConstant(obj) && obj.name === "exp";
  }

  static isLog(obj) {
    return Term.isConstant(obj) && obj.name === "log";
  }

  static isCos(obj) {
    return Term.isConstant(obj) && obj.name === "cos";
  }

  static isSin(obj) {
    return Term.isConstant(obj) && obj.name === "sin";
  }

  static isFloor(obj) {
    return Term.isConstant(obj) && obj.name === "floor";
  }

  static isCeil(obj) {
    return Term.isConstant(obj) && obj.name === "ceil";
  }

  static isReal(obj) {
    return Term.isLiteral(obj) && obj.type === "real";
  }

  static isHint(obj) {
    return Term.isLiteral(obj) && obj.type === "hint";
  }

  static isWord(obj) {
    return Term.isLiteral(obj) && obj.type === "word";
  }

  static isBlock(obj) {
    return Term.isUnary(obj) && obj.type === "block";
  }

  static isSequence(obj) {
    return Term.isBinary(obj) && obj.type === "sequence";
  }
}

export class Constant extends Term {
  constructor(name) {
    super();
    this.name = name;
  }
}

export class Literal extends Term {
  constructor(type, value) {
    super();
    this.type = type;
    this.value = value;
  }
}

export class Unary extends Term {
  constructor(type, body) {
    super();
    this.type = type;
    this.body = body;
  }
}

export class Binary extends Term {
  constructor(type, fst, snd) {
    super();
    this.type = type;
    this.fst = fst;
    this.snd = snd;
  }
}

export class Real {
  static sum(fst, snd) {
    assert(Term.isReal(fst));
    assert(Term.isReal(snd));
    return Term.real(fst.value + snd.value);
  }

  static negate(obj) {
    assert(Term.isReal(obj));
    return Term.real(0 - obj.value);
  }

  static product(fst, snd) {
    assert(Term.isReal(fst));
    assert(Term.isReal(snd));
    return Term.real(fst.value * snd.value);
  }

  static invert(obj) {
    assert(Term.isReal(obj));
    if (obj.value === 0) {
      return obj;
    } else {
      return Term.real(1 / obj.value);
    }
  }

  static exp(obj) {
    assert(Term.isReal(obj));
    return Term.real(Math.exp(obj.value));
  }

  static log(obj) {
    assert(Term.isReal(obj));
    return Term.real(Math.log(obj.value));
  }

  static cos(obj) {
    assert(Term.isReal(obj));
    return Term.real(Math.cos(obj.value));
  }

  static sin(obj) {
    assert(Term.isReal(obj));
    return Term.real(Math.sin(obj.value));
  }

  static floor(obj) {
    assert(Term.isReal(obj));
    return Term.real(Math.floor(obj.value));
  }

  static ceil(obj) {
    assert(Term.isReal(obj));
    return Term.real(Math.ceil(obj.value));
  }
}

const kId      = new Constant("id");
const kApply   = new Constant("apply");
const kBind    = new Constant("bind");
const kCopy    = new Constant("copy");
const kDrop    = new Constant("drop");
const kReset   = new Constant("reset");
const kShift   = new Constant("shift");
const kSum     = new Constant("sum");
const kNegate  = new Constant("negate");
const kProduct = new Constant("product");
const kInvert  = new Constant("invert");
const kExp     = new Constant("exp");
const kLog     = new Constant("log");
const kCos     = new Constant("cos");
const kSin     = new Constant("sin");
const kFloor   = new Constant("floor");
const kCeil    = new Constant("ceil");
