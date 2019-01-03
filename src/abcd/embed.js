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

// The idea here is to convert a string of ABCD in to a vector,
// "embedding" it in a "latent space". Vector arithmetic in this
// latent space will hopefully correspond to semantic operations on
// the original bytecode.
export class Codec {
  constructor() {

  }

  // The set of strings seen by the codec determines the structure of
  // the latent space.
  add(string) {

  }

  // Convert a string of code to a vector.
  encode(string) {
    return [];
  }

  // Convert a vector to a string of code.
  decode(vector) {
    return "";
  }
}
