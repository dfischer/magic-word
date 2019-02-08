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

namespace Abcc.Norm {
  public sealed class Sequence : Function {
    public Function First { get; }
    public Function Second { get; }

    public Sequence(Function fst, Function snd) {
      First = fst;
      Second = snd;
    }

    public override Function Then(Function rest) {
      var inner = Second.Then(rest);
      return First.Then(inner);
    }

    public override string ToString() {
      return $"{First} {Second}";
    }
  }
}
