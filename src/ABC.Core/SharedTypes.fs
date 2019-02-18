// This file is a part of ABC.
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

namespace ABC.Core

[<AutoOpen>]
module SharedTypes =  
  // Words are an "initial" level of normalization: we haven't yet done
  // the computation that balances braces, but we've broken things on
  // spaces and know what the shape of each token is.
  //
  // One reason I make this form explicit instead of e.g. going
  // straight to terms is that this is the canonical form for program
  // synthesis with neural nets as well. Another is that I may want to
  // do graph rewriting at some point, so there's nothing special
  // about terms.
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
    | Var of string

  type IContainer =
    abstract member Set: string -> string -> unit
    abstract member Delete: string -> unit
    abstract member Norm: string -> string
