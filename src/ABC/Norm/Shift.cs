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

using System.Collections.Generic;

namespace ABC.Norm {
  public sealed class Shift : Function {
    public override string ToString() {
      return "s";
    }

    internal override void Step(Machine machine) {
      var buf = new Stack<Function>();
      var block = machine.Peek() as Quote;
      var keepGoing = true;
      while (machine.Busy && keepGoing) {
        var fn = machine.Dequeue();
        if (fn is Reset) {
          var rest = Function.Identity;
          foreach (var child in buf) {
            rest = child.Then(rest);
          }
          rest = rest.Quote();
          machine.Pop();
          machine.Push(rest);
          machine.Enqueue(block.Body);
          keepGoing = false;
        } else {
          buf.Push(fn);
        }
      }
      if (keepGoing) {
        machine.Thunk(this);
        foreach (var child in buf) {
          machine.Dump(child);
        }
      } else {
        machine.Tick();
      }
    }
  }
}
