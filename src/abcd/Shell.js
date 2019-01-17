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

import assert from "../assert.js";
import Module from "./Module.js";

// A textual interface to modules:
//
//     /prefix %hash
//     :name body
//     ~name
//
// `/prefix` imports the contents of the hash under that prefix.
// `:name` defines `name` as `body`.
// `~name` undefines `name`.
export default class Shell {
  constructor() {
    // `_module` is a module of ABCD.
    this._module = new Module();
    // `_subs` is a map from event names to arrays of listeners.
    this._subs = new Map();
    this._subs.set("define", []);
    this._subs.set("delete", []);
  }

  // Notify subs of an event.
  _publish(event, data) {
    assert(this._subs.has(event), `no such event: ${event}`);
    for (let thunk of this._subs.get(event)) {
      Promise.resolve().then(() => thunk(data));
    }
  }

  _define(key, value) {
    this._module.define(key, value);
    this._publish("define", [key, value]);
  }

  _delete(key) {
    this._module.delete(key);
    this._publish("delete", key);
  }

  _import(ref) {

  }

  _exec(line) {
    var match = line.match(/^:([^\[\]\(\)\t\r\n ]+) +(.*)$/);
    if (match !== null) {
      this._define(match[1], match[2]);
      return match[2];
    }
    var match = line.match(/^~([^\[\]\(\)\t\r\n ]+)$/);
    if (match !== null) {
      this._delete(match[1]);
      return match[1];
    }
    return this._module.normalize(line);
  }

  // Send newline separated input to the shell.
  send(input) {
    let buf = [];
    let lines = input.split("\n").map(x => x.trim());
    for (let line of lines) {
      let output = this._exec(line);
      buf.push(output);
    }
    return buf.join("\n");
  }

  on(event, thunk) {
    assert(this._subs.has(event), `no such event: ${event}`);
    let buf = this._subs.get(event);
    buf.push(thunk);
    // Add a flag so the removal function is idempotent.
    let removed = false;
    return () => {
      if (!removed) {
        buf.splice(buf.indexOf(thunk), 1);
        removed = true;
      }
    }
  }

  // Serialize this shell to commands that will recreate it.
  // `shell` equals `new Shell().send(shell.toString())`
  toString() {
    let buf = [];
    for (let [key, value] of this._module) {
      buf.push(`:${key} ${value}`);
    }
    return buf.join("\n");
  }
}
