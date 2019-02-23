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

// Terms are a more committal level of parsing than words: code is now
// tree shaped and will evaluate by rewriting. But e.g. we could have
// gone to graphs instead, with something like an interaction net.
module Term =
  type Term =
    | Id
    | Apply
    | Bind
    | Copy
    | Drop
    | Inequal
    | Reset
    | Shift
    | Bang of string
    | Symbol of string
    | Variable of string
    | Quote of Term
    | Sequence of (Term * Term)

  let rec sequence fst snd =
    match (fst, snd) with
      | (_, Id)                    -> fst
      | (Id, _)                    -> snd
      | (Sequence (head, tail), _) -> sequence head <| sequence tail snd
      | _                          -> Sequence (fst, snd)

  type private ReaderState = {
    stack : Term list list
    build : Term list
  }

  // Save the current term on the stack and start a new one.  Called
  // when the reader reaches a '['.
  let private save ctx =
    { build = []; stack = ctx.build :: ctx.stack }

  // Try to pop the stack and make a quote from the saved term. If the
  // stack is empty, then the brackets are unbalanced, and we return
  // in the error branch.
  let private tryRestore ctx =
    match ctx.stack with
      | prev :: rest ->
        let build = List.rev ctx.build
        let block = Quote <| List.fold sequence Id build
        Some <| { build = block :: prev; stack = rest }
      | [] ->
        None

  // Put a term on the building stack.
  let private push ctx term =
    { ctx with build = term :: ctx.build }

  // Perform one step of the reader's computation.
  let private stepReader ctx word =
    match ctx with
      | None     -> None
      | Some ctx ->
        match word with
          | Word.Begin         -> Some <| save ctx
          | Word.End           -> tryRestore ctx
          | Word.Id            -> Some ctx
          | Word.Apply         -> Some <| push ctx Apply
          | Word.Bind          -> Some <| push ctx Bind
          | Word.Copy          -> Some <| push ctx Copy
          | Word.Drop          -> Some <| push ctx Drop
          | Word.Inequal       -> Some <| push ctx Inequal
          | Word.Reset         -> Some <| push ctx Reset
          | Word.Shift         -> Some <| push ctx Shift
          | Word.Bang name     -> Some <| push ctx (Bang name)
          | Word.Symbol name   -> Some <| push ctx (Symbol name)
          | Word.Variable name -> Some <| push ctx (Variable name)

  let parse (words: Word list) : Term option =
    let init = Some <| { build = []; stack = []; }
    match List.fold stepReader init words with
      | None -> None
      | Some ctx ->
        let build = List.rev ctx.build
        Some <| List.fold sequence Id build

  let rec quote (term: Term): Word list =
    match term with
      | Id            -> [Word.Id]
      | Apply         -> [Word.Apply]
      | Bind          -> [Word.Bind]
      | Copy          -> [Word.Copy]
      | Drop          -> [Word.Drop]
      | Inequal       -> [Word.Inequal]
      | Reset         -> [Word.Reset]
      | Shift         -> [Word.Shift]
      | Bang name     -> [Word.Bang name]
      | Symbol name   -> [Word.Symbol name]
      | Variable name -> [Word.Variable name]
      | Quote body    ->
        let body = quote body
        List.concat [[Word.Begin]; body; [Word.End]]
      | Sequence (fst, snd) ->
        let fst = quote fst
        let snd = quote snd
        List.concat [fst; snd]

  type private RewriteState = {
    sink : Term list
    data : Term list
    code : Term list
  }

  let private thunk st term =
    let sink' = List.append st.sink st.data
    let sink' = term :: sink'
    { st with sink = sink'; data = [] }

  let rec private fetch st =
    match st.code with
      | Sequence (fst, snd) :: tail ->
        fetch <| { st with code = fst :: snd :: tail }
      | head :: tail ->
        Some <| (head, { st with code = tail })
      | [] -> None

  let rewrite (term: Term): Term =
    term
