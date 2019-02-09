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
using ABC.Blocks;

namespace ABC.Norm {
  public class CDSNorm : INorm, IBlockVisitor {
    private CDSMachine machine;

    public CDSNorm() {

    }

    public Block Norm(Block init, int quota) {
      machine = new CDSMachine(init, quota);
      while (machine.Busy) {
        var block = machine.Dequeue();
        block.Accept(this);
      }
      return machine.ToBlock();
    }

    public void VisitApply(ApplyBlock block) {
      if (machine.Arity < 2) {
        machine.Thunk(block);
      } else {
        machine.Tick();
        var fn = machine.Pop() as QuoteBlock;
        var value = machine.Pop();
        machine.Enqueue(fn.Body);
        machine.Enqueue(value);
      }
    }

    public void VisitBind(BindBlock block) {
      if (machine.Arity < 2) {
        machine.Thunk(block);
      } else {
        machine.Tick();
        var fn = machine.Pop() as QuoteBlock;
        var value = machine.Pop();
        var result = value.Then(fn.Body).Quote();
        machine.Push(result);
      }
    }

    public void VisitCopy(CopyBlock block) {
      if (machine.Arity < 1) {
        machine.Thunk(block);
      } else {
        machine.Tick();
        var value = machine.Peek();
        machine.Push(value);
      }
    }

    public void VisitDrop(DropBlock block) {
      if (machine.Arity < 1) {
        machine.Thunk(block);
      } else {
        machine.Tick();
        machine.Pop();
      }
    }

    public void VisitReset(ResetBlock block) {
      machine.Thunk(block);
    }

    public void VisitShift(ShiftBlock block) {
      var buf = new Stack<Block>();
      var shift = machine.Peek() as QuoteBlock;
      var keepGoing = true;
      while (machine.Busy && keepGoing) {
        var next = machine.Dequeue();
        if (next is ResetBlock) {
          var rest = Block.Identity;
          foreach (var child in buf) {
            rest = child.Then(rest);
          }
          rest = rest.Quote();
          machine.Pop();
          machine.Push(rest);
          machine.Enqueue(shift.Body);
          keepGoing = false;
        } else {
          buf.Push(next);
        }
      }
      if (keepGoing) {
        machine.Thunk(block);
        foreach (var child in buf) {
          machine.Dump(child);
        }
      } else {
        machine.Tick();
      }
    }

    public void VisitQuote(QuoteBlock block) {
      machine.Push(block);
    }

    public void VisitSequence(SequenceBlock block) {
      machine.Enqueue(block.First);
      machine.Enqueue(block.Second);
    }

    public void VisitVariable(VariableBlock block) {
      machine.Thunk(block);
    }

    public void VisitIdentity(IdentityBlock block) {
      //
    }
  }
}
