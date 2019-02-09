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
using ABC.Read;

namespace ABC.Norm {
  class CDSMachine {
    private Queue<Term> code;
    private Stack<Term> data;
    private Stack<Term> sink;
    private int quota;

    internal CDSMachine(Term init, int quota_) {
      code = new Queue<Term>();
      data = new Stack<Term>();
      sink = new Stack<Term>();
      quota = quota_;
      code.Enqueue(init);
    }

    internal bool Busy {
      get { return code.Count > 0 && quota > 0; }
    }

    internal int Arity {
      get { return data.Count; }
    }

    internal CDSMachine Tick() {
      quota = quota - 1;
      return this;
    }

    internal CDSMachine Thunk(Term term) {
      foreach (var child in data.Reverse()) {
        sink.Push(child);
      }
      sink.Push(term);
      data.Clear();
      return this;
    }

    internal CDSMachine Push(Term term) {
      data.Push(term);
      return this;
    }

    internal Term Pop() {
      return data.Pop();
    }

    internal Term Peek() {
      return data.Peek();
    }

    internal CDSMachine Enqueue(Term term) {
      code.Enqueue(term);
      return this;
    }

    internal Term Dequeue() {
      while (true) {
        var term = code.Dequeue();
        switch (term) {
        case SequenceTerm seq:
          code.Enqueue(seq.First);
          code.Enqueue(seq.Second);
          break;
        default:
          return term;
        }
      }
    }

    internal CDSMachine Dump(Term term) {
      sink.Push(term);
      return this;
    }

    internal Term ToTerm() {
      var term = Term.Identity;
      foreach (var child in code.Reverse()) {
        term = child.Then(term);
      }
      foreach (var child in data) {
        term = child.Then(term);
      }
      foreach (var child in sink) {
        term = child.Then(term);
      }
      return term;
    }
  }
}
