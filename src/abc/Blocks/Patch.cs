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
using System.Text.RegularExpressions;

namespace ABC.Blocks {
  public abstract class Patch {
    public static readonly Patch Identity = new IdentityPatch();

    public abstract void Apply(Module module);
    public abstract void Accept(IPatchVisitor visitor);

    public virtual Patch Then(Patch rest) {
      if (rest is IdentityPatch) {
        return this;
      } else {
        return new SequencePatch(this, rest);
      }
    }

    public static bool TryFromString(string src, out Patch patch) {
      var setPattern = new Regex(@":([a-z][a-z0-9-]+) ([a-z0-9-\[\] ]+)$");
      var unsetPattern = new Regex(@"~([a-z][a-z0-9-]+)$");
      var state = Patch.Identity;
      var commands = src.Split("\n", StringSplitOptions.RemoveEmptyEntries);
      Array.Reverse(commands);
      foreach (var command in commands) {
        if (setPattern.IsMatch(command)) {
          Console.WriteLine($"Patch: parsed set command: {command}");
          var match = setPattern.Match(command);
          var name = match.Groups[1].Value;
          Block body;
          if (!Block.TryFromString(match.Groups[2].Value, out body)) {
            patch = null;
            return false;
          }
          var next = new SetPatch(name, body);
          state = next.Then(state);
        } else if (unsetPattern.IsMatch(command)) {
          Console.WriteLine($"Patch: parsed unset command: {command}");
          var match = unsetPattern.Match(command);
          var name = match.Groups[1].Value;
          var next = new UnsetPatch(name);
          state = next.Then(state);
        } else {
          Console.WriteLine($"Patch: couldn't parse command: {command}");
          patch = null;
          return false;
        }
      }
      patch = state;
      return true;
    }

    public static Patch FromModule(Module module) {
      var patch = Patch.Identity;
      foreach (var word in module) {
        var next = new SetPatch(word.Name, word.Body);
        patch = next.Then(patch);
      }
      return patch;
    }
  }
}
