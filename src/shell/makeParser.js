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

export default (image) => {
  const setPattern = /^:([a-z][a-z0-9-]+) +(.*)$/;
  const unsetPattern = /^~([a-z][a-z0-9-]+) *$/;
  return (line) => {
    var matches = line.match(setPattern);
    if (matches !== null) {
      let key = matches[1];
      let value = matches[2];
      return () => image.set(key, value);
    }
    var matches = line.match(unsetPattern);
    if (matches !== null) {
      let key = matches[1];
      return () => image.unset(key);
    }
    return () => image.norm(line);
  }
}
