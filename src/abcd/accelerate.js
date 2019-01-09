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
// to recognize the implementations of `inl`, `inr` and `pair`.

// Predicates the unit block: []
export function isUnit(block) {
  return block === "[]";
}

// Predicates blocks that implemement `inl`.
// [L] [R] [X] inl exec = [X] L
export function isInl(block) {
  let residual = normalize(`[fst] [snd] [value] ${block} [] [] b a a d`);
  return residual === "[value] fst";
}

// Predicates blocks that implement `inr`.
// [L] [R] [X] inr exec = [X] R
export function isInr(block) {
  let residual = normalize(`[fst] [snd] [value] ${block} [] [] b a a d`);
  return residual === "[value] snd";
}

// Predicates blocks that implement `pair`.
// [A] [B] pair = [[A] [B]]
export function isPair(block) {
  let residual = normalize(`[fst] [snd] ${block}`);
  return residual === "[[fst] [snd]]";
}
