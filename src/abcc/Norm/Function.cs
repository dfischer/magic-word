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

namespace Abcc.Norm {
  public abstract class Function {
    public static readonly Function Apply    = new Apply();
    public static readonly Function Bind     = new Bind();
    public static readonly Function Copy     = new Copy();
    public static readonly Function Drop     = new Drop();
    public static readonly Function Reset    = new Reset();
    public static readonly Function Shift    = new Shift();
    public static readonly Function Identity = new Identity();

    public static Function FromString(string src) {
      var atomPattern = new Regex(@"^[abcdrs]$");
      var variablePattern = new Regex(@"^[a-z0-9-]+$");
      var build = new Stack<Function>();
      var stack = new Stack<Stack<Function>>();
      src = src.Replace("[", "[ ");
      src = src.Replace("]", " ]");
      var words = src.Split(" ", StringSplitOptions.RemoveEmptyEntries);
      foreach (var word in words) {
        if (word == "[") {
          stack.Push(build);
          build = new Stack<Function>();
        } else if (word == "]") {
          Function function = Function.Identity;
          foreach (var child in build) {
            function = child.Then(function);
          }
          function = function.Quote();
          build = stack.Pop();
          build.Push(function);
        } else if (atomPattern.IsMatch(word)) {
          switch (word) {
          case "a":
            build.Push(Function.Apply);
            break;
          case "b":
            build.Push(Function.Bind);
            break;
          case "c":
            build.Push(Function.Copy);
            break;
          case "d":
            build.Push(Function.Drop);
            break;
          case "r":
            build.Push(Function.Reset);
            break;
          case "s":
            build.Push(Function.Shift);
            break;
          default:
            throw new Exception($"Unknown token: {word}");
          }
        } else if (variablePattern.IsMatch(word)) {
          build.Push(new Variable(word));
        } else {
          throw new Exception($"Unknown token: {word}");
        }
      }
      var state = Function.Identity;
      foreach (var child in build) {
        state = child.Then(state);
      }
      return state;
    }

    public Function Expand(int quota) {
      return this;
    }

    public Function Norm(int quota) {
      var machine = new Machine(this, quota);
      while (machine.Busy) {
        var fn = machine.Dequeue();
        fn.Step(machine);
      }
      return machine.ToFunction();
    }

    public Function Quote() {
      return new Quote(this);
    }

    public virtual Function Then(Function rest) {
      if (rest is Identity) {
        return this;
      } else {
        return new Sequence(this, rest);
      }
    }

    internal abstract void Step(Machine machine);
  }
}
