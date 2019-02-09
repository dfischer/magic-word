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

namespace ABC.Blocks {
  // A block is a function made of ABC bytecode. All values in ABC are
  // blocks.
  public abstract class Block {
    public static readonly Block Apply    = new ApplyBlock();
    public static readonly Block Bind     = new BindBlock();
    public static readonly Block Copy     = new CopyBlock();
    public static readonly Block Drop     = new DropBlock();
    public static readonly Block Reset    = new ResetBlock();
    public static readonly Block Shift    = new ShiftBlock();
    public static readonly Block Identity = new IdentityBlock();

    // Read a block from a string. ABC is a Forth-like concatenative
    // language:
    // * Atoms are one of { a, b, c, d, r, s } and represent primitive
    //   combinators.
    // * Words are alphanumeric, with hyphens, and must start with an
    //   alpha.
    // * Quotations are delimited with [brackets].
    public static Block FromString(string src) {
      var atomPattern = new Regex(@"^[abcdrs]$");
      var variablePattern = new Regex(@"^[a-z][a-z0-9-]+$");
      var build = new Stack<Block>();
      var stack = new Stack<Stack<Block>>();
      src = src.Replace("[", "[ ");
      src = src.Replace("]", " ]");
      var words = src.Split(" ", StringSplitOptions.RemoveEmptyEntries);
      foreach (var word in words) {
        if (word == "[") {
          stack.Push(build);
          build = new Stack<Block>();
        } else if (word == "]") {
          Block block = Block.Identity;
          foreach (var child in build) {
            block = child.Then(block);
          }
          block = block.Quote();
          build = stack.Pop();
          build.Push(block);
        } else if (atomPattern.IsMatch(word)) {
          switch (word) {
          case "a":
            build.Push(Block.Apply);
            break;
          case "b":
            build.Push(Block.Bind);
            break;
          case "c":
            build.Push(Block.Copy);
            break;
          case "d":
            build.Push(Block.Drop);
            break;
          case "r":
            build.Push(Block.Reset);
            break;
          case "s":
            build.Push(Block.Shift);
            break;
          default:
            throw new Exception($"Unknown token: {word}");
          }
        } else if (variablePattern.IsMatch(word)) {
          build.Push(new VariableBlock(word));
        } else {
          throw new Exception($"Unknown token: {word}");
        }
      }
      var state = Block.Identity;
      foreach (var child in build) {
        state = child.Then(state);
      }
      return state;
    }

    // Mention this block instead of using it.
    public Block Quote() {
      return new QuoteBlock(this);
    }

    // Sequence this block and the argument.
    public virtual Block Then(Block rest) {
      if (rest is IdentityBlock) {
        return this;
      } else {
        return new SequenceBlock(this, rest);
      }
    }

    public abstract void Accept(IBlockVisitor visitor);
  }
}
