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

open System

module Word =
  let parse (src: string): Word list =
    let src = src.Replace("[", "[ ")
    let src = src.Replace("]", " ]")
    let tokens = src.Split(" ", StringSplitOptions.RemoveEmptyEntries)
    let tokens = Array.toList tokens
    List.map (fun token ->
              match token with
              | "a" -> Apply
              | "b" -> Bind
              | "c" -> Copy
              | "d" -> Drop
              | "r" -> Reset
              | "s" -> Shift
              | "[" -> Begin
              | "]" -> End
              | _   -> Var token) tokens

  let quote (words: Word list): string =
    let xs = List.map (fun word ->
                       match word with
                       | Id       -> ""
                       | Apply    -> "a"
                       | Bind     -> "b"
                       | Copy     -> "c"
                       | Drop     -> "d"
                       | Reset    -> "r"
                       | Shift    -> "s"
                       | Begin    -> "["
                       | End      -> "]"
                       | Var name -> name) words
    String.concat " " xs
