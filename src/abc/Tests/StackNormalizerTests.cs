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
using ABC.Normalize;

namespace ABC.Tests {
  public class StackNormalizerTests {
    private INormalizer ctx;

    public StackNormalizerTests() {
      ctx = new StackNormalizer();
    }

    [Fact]
    public void Apply() {
      var src = "[foo] [bar] a";
      var res = "bar [foo]";
      Assert.Equal(res, ctx.Normalize(src));
    }

    [Fact]
    public void Bind() {
      var src = "[foo] [bar] b";
      var res = "[[foo] bar]";
      Assert.Equal(res, ctx.Normalize(src));
    }

    [Fact]
    public void Copy() {
      var src = "[foo] c";
      var res = "[foo] [foo]";
      Assert.Equal(res, ctx.Normalize(src));
    }

    [Fact]
    public void Drop() {
      var src = "[foo] d";
      var res = "";
      Assert.Equal(res, ctx.Normalize(src));
    }

    [Fact]
    public void ResetShift() {
      var src = "[foo] s bar r";
      var res = "[bar] foo";
      Assert.Equal(res, ctx.Normalize(src));
    }
  }
}
