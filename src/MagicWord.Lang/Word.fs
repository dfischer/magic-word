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

namespace MagicWord.Lang

open System
open System.Text.RegularExpressions

module Word =
  let parse (src: string): Word list option =
    let tagR = Regex(@"^#[a-z][a-z0-9-]*$")
    let varR = Regex(@"^[a-z][a-z0-9-]*$")
    let defR = Regex(@"^:[a-z][a-z0-9-]*$")
    let delR = Regex(@"^\.[a-z][a-z0-9-]*$")

    let isTag (token: string): bool = tagR.IsMatch(token)
    let isVar (token: string): bool = varR.IsMatch(token)
    let isDef (token: string): bool = defR.IsMatch(token)
    let isDel (token: string): bool = delR.IsMatch(token)

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
                 | "r" -> Some Reset
                 | "s" -> Some Shift
                 | "[" -> Some Begin
                 | "]" -> Some End
                 | _   ->
                 if isTag token then Some <| Tag token
                 elif isVar token then Some <| Var token
                 elif isDef token then Some <| Def token
                 elif isDel token then Some <| Del token
                 else None)
    |> Option.all

  let quote (words: Word list): string =
    words
    |> List.map (function
                 | Id       -> ""
                 | Apply    -> "a"
                 | Bind     -> "b"
                 | Copy     -> "c"
                 | Drop     -> "d"
                 | Reset    -> "r"
                 | Shift    -> "s"
                 | Begin    -> "["
                 | End      -> "]"
                 | Tag name -> name
                 | Var name -> name
                 | Def name -> ":" + name
                 | Del name -> "." + name)
    |> String.concat " "
    |> String.replace "[ " "["
    |> String.replace " ]" "]"
