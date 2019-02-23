// This file is a part of Planet Forth.
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

namespace PlanetForth.Lang

open System
open System.Text.RegularExpressions

module Word =
  let parse (src: string): Word list option =
    let bangR     = Regex(@"^[a-z][a-z0-9-]*!$")
    let symbolR   = Regex(@"^/[a-z][a-z0-9-]+$")
    let variableR = Regex(@"^[a-z][a-z0-9-]*$")

    let isBang (token: string): bool =
      bangR.IsMatch(token)

    let isSymbol (token: string): bool =
      symbolR.IsMatch(token)

    let isVariable (token: string): bool =
      variableR.IsMatch(token)

    src
    |> String.replace "[" "[ "
    |> String.replace "]" " ]"
    |> String.split " "
    |> List.map (fun token ->
                 match token with
                 | "a" -> Some Apply
                 | "b" -> Some Bind
                 | "c" -> Some Copy
                 | "d" -> Some Drop
                 | "q" -> Some Inequal
                 | "r" -> Some Reset
                 | "s" -> Some Shift
                 | "[" -> Some Begin
                 | "]" -> Some End
                 | _   ->
                 if isBang token then Some <| Bang token
                 elif isSymbol token then Some <| Symbol token
                 elif isVariable token then Some <| Variable token
                 else None)
    |> Option.all

  let quote (words: Word list): string =
    words
    |> List.map (function
                 | Id            -> ""
                 | Apply         -> "a"
                 | Bind          -> "b"
                 | Copy          -> "c"
                 | Drop          -> "d"
                 | Inequal       -> "q"
                 | Reset         -> "r"
                 | Shift         -> "s"
                 | Begin         -> "["
                 | End           -> "]"
                 | Bang name     -> name
                 | Symbol name   -> name
                 | Variable name -> name)
    |> String.concat " "
    |> String.replace "[ " "["
    |> String.replace " ]" "]"
