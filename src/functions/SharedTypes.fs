// This file is a part of Magic Word.
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

namespace MagicWord.Functions

[<AutoOpen>]
module SharedTypes =
  type Word =
    | Id
    | Apply
    | Bind
    | Copy
    | Drop
    | Reset
    | Shift
    | Begin
    | End
    | Tag of string
    | Var of string
    // XXX TODO Better type than string for hashes.
    | Bin of string

  type Transaction =
    | Insert of (string * string)
    | Delete of string
    | Import of (string * string)

  type IDatabase =
    abstract member Apply: Transaction list -> unit
    abstract member Quote: unit -> Transaction list
    abstract member Rewrite: string -> string