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
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace ABC.Blocks {
  public class Module : IEnumerable<Word> {
    private Dictionary<string, Word> words;

    public Module() {
      words = new Dictionary<string, Word>();
    }

    public void Set(string name, Block block) {
      var word = new Word(name, block);
      words.Add(name, word);
    }

    public void Unset(string name) {
      words.Remove(name);
    }

    public bool TryGet(string name, out Block block) {
      Word word;
      if (words.TryGetValue(name, out word)) {
        block = word.Body;
        return true;
      } else {
        block = null;
        return false;
      }
    }

    public IEnumerator<Word> GetEnumerator() {
      foreach (var row in words) {
        yield return row.Value;
      }
    }

    IEnumerator IEnumerable.GetEnumerator() {
      return GetEnumerator();
    }
  }
}

