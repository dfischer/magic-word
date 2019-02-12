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

using System.Collections.Generic;
using ABC.Core.Blocks;

namespace ABC.Core.Normalize {
  public class StackNormalizer : INormalizer, IBlockVisitor {
    private StackMachine machine;
    private int defaultQuota;
    private IEnvironment env;

    public StackNormalizer() {
      env = null;
      defaultQuota = 4096;
    }

    public StackNormalizer(IEnvironment env_) {
      env = env_;
      defaultQuota = 4096;
    }

    public Block Normalize(Block init) {
      machine = new StackMachine(init, defaultQuota);
      while (machine.Busy) {
        var block = machine.Dequeue();
        block.Accept(this);
      }
      return machine.ToBlock();
    }

    public void VisitApply(ApplyBlock block) {
      // [A] [B] a = B [A]
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
      // [A] [B] b = [[A] B]
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
      // [A] c = [A] [A]
      if (machine.Arity < 1) {
        machine.Thunk(block);
      } else {
        machine.Tick();
        var value = machine.Peek();
        machine.Push(value);
      }
    }

    public void VisitDrop(DropBlock block) {
      // [A] d =
      if (machine.Arity < 1) {
        machine.Thunk(block);
      } else {
        machine.Tick();
        machine.Pop();
      }
    }

    public void VisitReset(ResetBlock block) {
      // [A] r = [A] r
      machine.Thunk(block);
    }

    public void VisitShift(ShiftBlock block) {
      // [A] s B C D r = [B C D] A
      var buf = new Stack<Block>();
      var shift = machine.Peek() as QuoteBlock;
      var keepGoing = true;
      // Look for the next reset block, keeping track of the blocks we
      // see along the way.
      while (machine.Busy && keepGoing) {
        var next = machine.Dequeue();
        if (next is ResetBlock) {
          // [A] s B C D r = [B C D] A
          // A "continuation" made of all of the blocks we've seen
          // along the way are given as an argument to the block that
          // was shifted.
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
          // We haven't found the reset block yet, so just remember
          // the block that we did see.
          buf.Push(next);
        }
      }
      if (keepGoing) {
        // We never found the reset block, but the loop ended because
        // we ran out of code. So dump the shift block, along with all
        // of the blocks we saved while looking for the matching
        // reset.
        machine.Thunk(block);
        foreach (var child in buf) {
          machine.Dump(child);
        }
      } else {
        // We found the reset block, so consume some quota.
        machine.Tick();
      }
    }

    public void VisitQuote(QuoteBlock block) {
      // A quote is a block like `[foo]`, so just put it on the stack.
      machine.Push(block);
    }

    public void VisitSequence(SequenceBlock block) {
      // Queue up the components of the sequence in order.
      machine.Enqueue(block.First);
      machine.Enqueue(block.Second);
    }

    public void VisitVariable(VariableBlock block) {
      if (env != null) {
        Block binding;
        if (env.TryResolve(block, out binding)) {
          binding.Accept(this);
        } else {
          machine.Thunk(block);
        }
      } else {
        machine.Thunk(block);
      }
    }

    public void VisitIdentity(IdentityBlock block) {
      // The identity function is very simple.
    }
  }
}
