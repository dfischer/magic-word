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

using Xunit;

using ABC.Blocks;

namespace ABC.Tests {
  public class PatchTests {
    private Module module;
    
    public PatchTests() {
      module = new Module();
    }

    [Fact]
    public void Set() {
      var src = ":foo bar baz qux";
      Patch patch;
      Assert.True(Patch.TryFromString(src, out patch));
      patch.Apply(module);
      Block block;
      Assert.True(module.TryGet("foo", out block));
      Assert.Equal("bar baz qux", block.ToString());
    }

    [Fact]
    public void SetThenUnset() {
      var src = ":foo bar baz qux";
      Patch patch;
      Assert.True(Patch.TryFromString(src, out patch));
      patch.Apply(module);
      Block block;
      Assert.True(module.TryGet("foo", out block));
      Assert.Equal("bar baz qux", block.ToString());
      src = "~foo";
      Assert.True(Patch.TryFromString(src, out patch));
      patch.Apply(module);
      Assert.False(module.TryGet("foo", out block));
      Assert.Null(block);
    }

    [Fact]
    public void SetUnsetBatch() {
      var src = ":foo bar baz qux\n~foo";
      Patch patch;
      Assert.True(Patch.TryFromString(src, out patch));
      patch.Apply(module);
      Block block;
      Assert.False(module.TryGet("foo", out block));
      Assert.Null(block);
    }
  }
}

