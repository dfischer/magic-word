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
using System.Linq;
using System.Collections.Generic;

namespace ABC.Norm {
  class Machine {
    private Stack<Function> sink;
    private Stack<Function> data;
    private Queue<Function> code;
    private int quota;

    internal Machine(Function init, int quota_) {
      sink = new Stack<Function>();
      data = new Stack<Function>();
      code = new Queue<Function>();
      quota = quota_;
      code.Enqueue(init);
    }

    internal bool Busy {
      get { return code.Count > 0 && quota > 0; }
    }

    internal int Arity {
      get { return data.Count; }
    }

    internal Machine Tick() {
      quota = quota - 1;
      return this;
    }

    internal Machine Thunk(Function fn) {
      foreach (var child in data.Reverse()) {
        sink.Push(child);
      }
      sink.Push(fn);
      data.Clear();
      return this;
    }

    internal Machine Push(Function fn) {
      data.Push(fn);
      return this;
    }

    internal Function Pop() {
      return data.Pop();
    }

    internal Function Peek() {
      return data.Peek();
    }

    internal Machine Enqueue(Function fn) {
      code.Enqueue(fn);
      return this;
    }

    internal Function Dequeue() {
      while (true) {
        var fn = code.Dequeue();
        switch (fn) {
        case Sequence seq:
          code.Enqueue(seq.First);
          code.Enqueue(seq.Second);
          break;
        default:
          return fn;
        }
      }
    }

    internal Machine Dump(Function fn) {
      sink.Push(fn);
      return this;
    }

    internal Function ToFunction() {
      var fn = Function.Identity;
      foreach (var child in code.Reverse()) {
        fn = child.Then(fn);
      }
      foreach (var child in data) {
        fn = child.Then(fn);
      }
      foreach (var child in sink) {
        fn = child.Then(fn);
      }
      return fn;
    }
  }
}
