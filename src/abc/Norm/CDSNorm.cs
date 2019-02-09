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
using ABC.Read;

namespace ABC.Norm {
  public class CDSNorm : INorm, ITermVisitor {
    private CDSMachine machine;

    public CDSNorm() {

    }

    public Term Norm(Term init, int quota) {
      machine = new CDSMachine(init, quota);
      while (machine.Busy) {
        var term = machine.Dequeue();
        term.Accept(this);
      }
      return machine.ToTerm();
    }

    public void VisitApply(ApplyTerm term) {
      if (machine.Arity < 2) {
        machine.Thunk(term);
      } else {
        machine.Tick();
        var block = machine.Pop() as QuoteTerm;
        var value = machine.Pop();
        machine.Enqueue(block.Body);
        machine.Enqueue(value);
      }
    }

    public void VisitBind(BindTerm term) {
      if (machine.Arity < 2) {
        machine.Thunk(term);
      } else {
        machine.Tick();
        var block = machine.Pop() as QuoteTerm;
        var value = machine.Pop();
        var result = value.Then(block.Body).Quote();
        machine.Push(result);
      }
    }

    public void VisitCopy(CopyTerm term) {
      if (machine.Arity < 1) {
        machine.Thunk(term);
      } else {
        machine.Tick();
        var value = machine.Peek();
        machine.Push(value);
      }
    }

    public void VisitDrop(DropTerm term) {
      if (machine.Arity < 1) {
        machine.Thunk(term);
      } else {
        machine.Tick();
        machine.Pop();
      }
    }

    public void VisitReset(ResetTerm term) {
      machine.Thunk(term);
    }

    public void VisitShift(ShiftTerm term) {
      var buf = new Stack<Term>();
      var block = machine.Peek() as QuoteTerm;
      var keepGoing = true;
      while (machine.Busy && keepGoing) {
        var fn = machine.Dequeue();
        if (fn is ResetTerm) {
          var rest = Term.Identity;
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
        machine.Thunk(term);
        foreach (var child in buf) {
          machine.Dump(child);
        }
      } else {
        machine.Tick();
      }
    }

    public void VisitQuote(QuoteTerm term) {
      machine.Push(term);
    }

    public void VisitSequence(SequenceTerm term) {
      machine.Enqueue(term.First);
      machine.Enqueue(term.Second);
    }

    public void VisitVariable(VariableTerm term) {
      machine.Thunk(term);
    }

    public void VisitIdentity(IdentityTerm term) {
      //
    }
  }
}
