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

using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace ABC.Read {
  public abstract class Term {
    public static readonly Term Apply    = new ApplyTerm();
    public static readonly Term Bind     = new BindTerm();
    public static readonly Term Copy     = new CopyTerm();
    public static readonly Term Drop     = new DropTerm();
    public static readonly Term Reset    = new ResetTerm();
    public static readonly Term Shift    = new ShiftTerm();
    public static readonly Term Identity = new IdentityTerm();

    public static Term FromString(string src) {
      var atomPattern = new Regex(@"^[abcdrs]$");
      var variablePattern = new Regex(@"^[a-z0-9-]+$");
      var build = new Stack<Term>();
      var stack = new Stack<Stack<Term>>();
      src = src.Replace("[", "[ ");
      src = src.Replace("]", " ]");
      var words = src.Split(" ", StringSplitOptions.RemoveEmptyEntries);
      foreach (var word in words) {
        if (word == "[") {
          stack.Push(build);
          build = new Stack<Term>();
        } else if (word == "]") {
          Term term = Term.Identity;
          foreach (var child in build) {
            term = child.Then(term);
          }
          term = term.Quote();
          build = stack.Pop();
          build.Push(term);
        } else if (atomPattern.IsMatch(word)) {
          switch (word) {
          case "a":
            build.Push(Term.Apply);
            break;
          case "b":
            build.Push(Term.Bind);
            break;
          case "c":
            build.Push(Term.Copy);
            break;
          case "d":
            build.Push(Term.Drop);
            break;
          case "r":
            build.Push(Term.Reset);
            break;
          case "s":
            build.Push(Term.Shift);
            break;
          default:
            throw new Exception($"Unknown token: {word}");
          }
        } else if (variablePattern.IsMatch(word)) {
          build.Push(new VariableTerm(word));
        } else {
          throw new Exception($"Unknown token: {word}");
        }
      }
      var state = Term.Identity;
      foreach (var child in build) {
        state = child.Then(state);
      }
      return state;
    }

    public Term Quote() {
      return new QuoteTerm(this);
    }

    public virtual Term Then(Term rest) {
      if (rest is IdentityTerm) {
        return this;
      } else {
        return new SequenceTerm(this, rest);
      }
    }

    public abstract void Accept(ITermVisitor visitor);
  }
}
