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

using System.Linq;
using System.Collections.Generic;
using ABC.Blocks;

namespace ABC.Norm {
  class CDSMachine {
    private Queue<Block> code;
    private Stack<Block> data;
    private Stack<Block> sink;
    private int quota;

    internal CDSMachine(Block init, int quota_) {
      code = new Queue<Block>();
      data = new Stack<Block>();
      sink = new Stack<Block>();
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

    internal CDSMachine Thunk(Block block) {
      foreach (var child in data.Reverse()) {
        sink.Push(child);
      }
      sink.Push(block);
      data.Clear();
      return this;
    }

    internal CDSMachine Push(Block block) {
      data.Push(block);
      return this;
    }

    internal Block Pop() {
      return data.Pop();
    }

    internal Block Peek() {
      return data.Peek();
    }

    internal CDSMachine Enqueue(Block block) {
      code.Enqueue(block);
      return this;
    }

    internal Block Dequeue() {
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

    internal CDSMachine Dump(Block block) {
      sink.Push(block);
      return this;
    }

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
