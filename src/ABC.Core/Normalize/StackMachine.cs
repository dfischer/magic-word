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

using System.Linq;
using System.Collections.Generic;
using ABC.Core.Blocks;

namespace ABC.Core.Normalize {
  class StackMachine {
    private Queue<Block> code;
    private Stack<Block> data;
    private Stack<Block> sink;
    private int quota;

    internal StackMachine(Block init, int quota_) {
      code = new Queue<Block>();
      data = new Stack<Block>();
      sink = new Stack<Block>();
      quota = quota_;
      code.Enqueue(init);
    }

    // The machine is busy while there's still blocks to be executed
    // and it hasn't run out of quota.
    internal bool Busy {
      get { return code.Count > 0 && quota > 0; }
    }

    // The number of blocks on the stack.
    internal int Arity {
      get { return data.Count; }
    }

    // Consume some quota due to a successful rewrite.
    internal void Tick() {
      quota = quota - 1;
    }

    // Put all of the data on the stack in to the sink, followed by
    // the block given as an argument. This happens when we're unable
    // to perform a rewrite, e.g. because there are not enough
    // arguments available, or because a variable is unbound. Instead
    // of crashing, the machine simply "thunks" that part of the
    // computation and keeps going.
    internal void Thunk(Block block) {
      foreach (var child in data.Reverse()) {
        sink.Push(child);
      }
      sink.Push(block);
      data.Clear();
    }

    // Put a block on top of the stack.
    internal void Push(Block block) {
      data.Push(block);
    }

    // Get the block at the top of the stack.
    internal Block Pop() {
      return data.Pop();
    }

    // Look at the block at the top of the stack.
    internal Block Peek() {
      return data.Peek();
    }

    // Schedule a block to be executed.
    internal void Enqueue(Block block) {
      code.Enqueue(block);
    }

    // Get the next block to be executed.
    internal Block Dequeue() {
      // Expand sequences, so that the block we return can readily be
      // executed.
      while (true) {
        var block = code.Dequeue();
        switch (block) {
        case SequenceBlock seq:
          code.Enqueue(seq.First);
          code.Enqueue(seq.Second);
          break;
        default:
          return block;
        }
      }
    }

    // Put a block directly in to the sink.
    internal void Dump(Block block) {
      sink.Push(block);
    }

    // Form a block from the sink, data stack, and code queue, from
    // left to right.
    internal Block ToBlock() {
      var block = Block.Identity;
      foreach (var child in code.Reverse()) {
        block = child.Then(block);
      }
      foreach (var child in data) {
        block = child.Then(block);
      }
      foreach (var child in sink) {
        block = child.Then(block);
      }
      return block;
    }
  }
}
