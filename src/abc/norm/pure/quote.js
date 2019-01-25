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

export default function quote(obj) {
  assert(Term.isTerm(obj));
  if (Term.isId(obj)) {
    return "";
  } else if (Term.isApply(obj)) {
    return "a";
  } else if (Term.isBind(obj)) {
    return "b";
  } else if (Term.isCopy(obj)) {
    return "c";
  } else if (Term.isDrop(obj)) {
    return "d";
  } else if (Term.isReset(obj)) {
    return "r";
  } else if (Term.isShift(obj)) {
    return "s";
  } else if (Term.isSum(obj)) {
    return "+";
  } else if (Term.isNegate(obj)) {
    return "-";
  } else if (Term.isProduct(obj)) {
    return "*";
  } else if (Term.isInvert(obj)) {
    return "/";
  } else if (Term.isExp(obj)) {
    return "^";
  } else if (Term.isLog(obj)) {
    return "$";
  } else if (Term.isCos(obj)) {
    return "@";
  } else if (Term.isSin(obj)) {
    return "%";
  } else if (Term.isFloor(obj)) {
    return "~";
  } else if (Term.isCeil(obj)) {
    return "#";
  } else if (Term.isHint(obj)) {
    return `(${obj.value})`;
  } else if (Term.isWord(obj)) {
    return obj.value;
  } else if (Term.isReal(obj)) {
    return obj.value.toString();
  } else if (Term.isBlock(obj)) {
    const body = quote(obj.body);
    return `[${body}]`;
  } else if (Term.isSequence(obj)) {
    const fst = quote(obj.fst);
    const snd = quote(obj.snd);
    return `${fst} ${snd}`;
  } else {
    throw `Couldn't quote object: ${obj}`;
  }
}
