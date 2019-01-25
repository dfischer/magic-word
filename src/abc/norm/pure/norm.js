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
import parse from "./parse.js";
import quote from "./quote.js";
import { Term, Real } from "./Term.js";

export default (src, expand) => {
  let gas   = 65535;
  let sink  = [];
  let data  = [];
  let code  = [parse(src)];
  let words = new Map();
  let redex;

  if (expand === undefined) {
    expand = (x) => x;
  }

  const fetch = () => {
    assert(code.length > 0);
    let term = code.pop();
    // XXX HACK Think of a better way to do word expansion.
    while (true) {
      if (Term.isSequence(term)) {
        code.push(term.snd);
        term = term.fst;
      } else if (Term.isWord(term)) {
        let src = expand(term.value);
        if (src === term.value) {
          break;
        } else {
          term = parse(src);
        }
      } else {
        break;
      }
    }
    return term;
  }

  const thunk = () => {
    sink = sink.concat(data);
    sink.push(redex);
    data = [];
  }

  const arith1 = (fn) => {
    if (data.length === 0) {
      thunk();
    } else {
      let value = data[data.length-1];
      if (!Term.isReal(value)) {
        thunk();
      } else {
        data.pop();
        let result = fn(value);
        data.push(result);
      }
    }
  }

  const arith2 = (fn) => {
    if (data.length < 2) {
      thunk();
    } else {
      let fst = data[data.length-1];
      let snd = data[data.length-2];
      if (!Term.isReal(fst) || !Term.isReal(snd)) {
        thunk();
      } else {
        data.pop();
        data.pop();
        let result = fn(fst, snd);
        data.push(result);
      }
    }
  }

  while (gas > 0 && code.length > 0) {
    gas--;
    redex = fetch();
    if (Term.isId(redex)) {
      //
    } else if (Term.isApply(redex)) {
      if (data.length < 2) {
        thunk();
      } else {
        let block = data.pop();
        let value = data.pop();
        code.push(value);
        code.push(block.body);
      }
    } else if (Term.isBind(redex)) {
      if (data.length < 2) {
        thunk();
      } else {
        let block = data.pop();
        let value = data.pop();
        let result = Term.block(
          Term.sequence(value, block.body));
        data.push(result);
      }
    } else if (Term.isCopy(redex)) {
      if (data.length === 0) {
        thunk();
      } else {
        let peek = data[data.length-1];
        data.push(peek);
      }
    } else if (Term.isDrop(redex)) {
      if (data.length === 0) {
        thunk();
      } else {
        data.pop();
      }
    } else if (Term.isReset(redex)) {
      thunk();
    } else if (Term.isShift(redex)) {
      if (data.length === 0) {
        thunk();
      } else {
        let block = data[data.length-1];
        let value = null;
        let buf = [];
        while (value === null && code.length > 0) {
          let term = fetch();
          if (Term.isReset(term)) {
            let body = buf.reduceRight((acc, x) => {
              return Term.sequence(x, acc);
            }, Term.id);
            value = Term.block(body);
          } else {
            buf.push(term);
          }
        }
        if (value === null) {
          thunk();
          sink = sink.concat(buf);
        } else {
          data.pop();
          data.push(value);
          code.push(block.body);
        }
      }
    } else if (Term.isSum(redex)) {
      arith2(Real.sum);
    } else if (Term.isNegate(redex)) {
      arith1(Real.negate);
    } else if (Term.isProduct(redex)) {
      arith2(Real.product);
    } else if (Term.isInvert(redex)) {
      arith1(Real.invert);
    } else if (Term.isExp(redex)) {
      arith1(Real.exp);
    } else if (Term.isLog(redex)) {
      arith1(Real.log);
    } else if (Term.isCos(redex)) {
      arith1(Real.cos);
    } else if (Term.isSin(redex)) {
      arith1(Real.sin);
    } else if (Term.isFloor(redex)) {
      arith1(Real.floor);
    } else if (Term.isCeil(redex)) {
      arith1(Real.ceil);
    } else if (Term.isReal(redex)) {
      data.push(redex);
    } else if (Term.isBlock(redex)) {
      data.push(redex);
    } else if (Term.isHint(redex)) {
      thunk();
    } else if (Term.isWord(redex)) {
      thunk();
    } else {
      throw `norm: unknown redex: ${redex}`;
    }
  }

  let state = Term.id;
  state = code.reduce((acc, x) => {
    return Term.sequence(x, acc);
  }, state);
  state = data.reduceRight((acc, x) => {
    return Term.sequence(x, acc);
  }, state);
  state = sink.reduceRight((acc, x) => {
    return Term.sequence(x, acc);
  }, state);

  let dst = quote(state);
  return dst
}

import test from "./test.js";
test();

